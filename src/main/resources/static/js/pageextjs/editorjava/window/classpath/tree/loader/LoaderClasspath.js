// NE FONCTIONNE PAS
Ext.define('Workspace.editorjava.window.classpath.tree.loader.LoaderClasspath', {
	// REQUIRED

	extend: 'Ext.ComponentLoader'
	,
	url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonClasspathDetail',
	autoLoad: true,
    listeners: {
        //scope: this, //yourScope
        'beforeload': function(treeLoader, options, eOpts) {
			options.params = {
    		    pApplication : Ext.getCmp('project').value
    		};
        }
   }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.classpath.tree.loader.LoaderClasspath');});
