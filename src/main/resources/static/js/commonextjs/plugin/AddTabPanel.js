// NAMESPACE
Ext.ns('Workspace.plugin');

// Fonctions commun du Plugin
var fnAddTabButton = (function() {

	function onTabPanelRender() {
	        this.addTab = this.itemTpl.insertBefore(this.edge, {
	            id: this.id + 'addTabButton',
	            cls: 'add-tab',
	            text: this.addTabText || '&#160',
	            iconCls: ''
	        }, true);
	        this.addTab.child('em.x-tab-left').setStyle('padding-right', '6px');
	        this.addTab.child('a.x-tab-right').setStyle('padding-left', '6px');
	        new Ext.ToolTip({
	            target: this.addTab,
	            bodyCfg: {
	                html: 'Add new tab'
	            }
	        });
	        this.addTab.on({
	            mousedown: stopEvent,
	            click: onAddTabClick,
	            scope: this
	        });
	    }

	    function createScrollers() {
	        this.scrollerWidth = (this.scrollRightWidth = this.scrollRight.getWidth()) + this.scrollLeft.getWidth();
	    }

	    function autoScrollTabs() {
	        var scrollersVisible = (this.scrollLeft && this.scrollLeft.isVisible()),
	            pos = this.tabPosition == 'top' ? 'header' : 'footer';
	        if (scrollersVisible) {
	            if (this.addTab.dom.parentNode === this.strip.dom) {
	                if (this.addTabWrap) {
	                    this.addTabWrap.show();
	                } else {
	                    this.addTabWrap = this[pos].createChild({
	                        cls: 'x-tab-strip-wrap',
	                        style: {
	                            position: 'absolute',
	                            right: (this.scrollRightWidth + 1) + 'px',
	                            top: 0,
	                            width: '30px',
	                            margin: 0
	                        }, cn: {
	                            tag: 'ul',
	                            cls: 'x-tab-strip x-tab-strip-' + this.tabPosition,
	                            style: {
	                                width: 'auto'
	                            }
	                        }
	                    });
	                    this.addTabWrap.setVisibilityMode(Ext.Element.DISPLAY);
	                    this.addTabUl = this.addTabWrap.child('ul');
	                }
	                this.addTabUl.dom.appendChild(this.addTab.dom);
	                this.addTab.setStyle('float', 'none');
	            }
	            this.stripWrap.setWidth(this[pos].getWidth(true) - (this.scrollerWidth + 31));
	            this.stripWrap.setStyle('margin-right', (this.scrollRightWidth + 31) + 'px');
	        } else {
	            if ((this.addTab.dom.parentNode !== this.strip.dom)) {
	                var notEnoughSpace = (((this[pos].getWidth(true) - this.edge.getOffsetsTo(this.stripWrap)[0])) < 33)
	                this.addTabWrap.hide();
	                this.addTab.setStyle('float', '');
	                this.strip.dom.insertBefore(this.addTab.dom, this.edge.dom);
	                this.stripWrap.setWidth(this.stripWrap.getWidth() + 31);
	                if (notEnoughSpace) {
	                    this.autoScrollTabs();
	                }
	            }
	        }
	    }

	    function autoSizeTabs() {
	        this.addTab.child('.x-tab-strip-inner').setStyle('width', '14px');
	    }

	    function stopEvent(e) {
	        e.stopEvent();
	    }

	    function onAddTabClick() {
	    	this.setActiveTab(this.add(this.plg.createTab()));
	    }

	    return {
	    	init: function(field) {
	            if (field instanceof Ext.TabPanel) {
	            	field.plg = this;
	            	field.onRender = field.onRender.createSequence(onTabPanelRender);
	            	field.createScrollers = field.createScrollers.createSequence(createScrollers);
	            	field.autoScrollTabs = field.autoScrollTabs.createSequence(autoScrollTabs);
	                field.autoSizeTabs = field.autoSizeTabs.createSequence(autoSizeTabs);
	            }
	        },
	        createTab : function () {
		    	return {
		        	closable:true,
		            title: 'New Tab'
		        }
	        }

	    };
});

// Création d'un plugin
Workspace.plugin.AddTabButton = new fnAddTabButton;

// REGISTER
Ext.reg('WorkspacePluginAddTabButton', Workspace.plugin.AddTabButton);

// Exemple de personnalisation d'une methode du plugin
////Création d'un autre plugin avec personnalisation de la méthode 'createTab'
Workspace.plugin.AddTabButton2 = new fnAddTabButton;
// Personnalisation de la méthode 'createTab'
Ext.apply(Workspace.plugin.AddTabButton2, {
	createTab : function () {
		var nb = Ext.getCmp('mainEstPanel').items.length+1;
		return {
            title: nb,
			id: 'panelEst'+nb,
			closable:true,
			layout: 'fit',
		    items: [
				{
			        xtype: 'htmleditor',
			        id: 'panelEstEditor'+nb,
			        enableColors: false,
			        enableAlignments: false
				}
		    ]
        };
    }
});

// REGISTER
//http://www.vinylfox.com/patterns-using-ext-js-override/
Ext.reg('WorkspacePluginAddTabButton2',Workspace.plugin.AddTabButton2);
