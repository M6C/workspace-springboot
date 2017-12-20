Ext.define('Workspace.common.constant.ConstantJava', {

	statics: {
        //https://ace.c9.io/tool/mode_creator.html
        //http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
        KEYWORDS: [
            'abstract','continue','for','new','switch','' +
            'assert','default','goto','package','synchronized','' +
            'boolean','do','if','private','this','' +
            'break','double','implements','protected','throw','' +
            'byte','else','import','public','throws','' +
            'case','enum','instanceof','return','transient','' +
            'catch','extends','int','short','try','' +
            'char','final','interface','static','void','' +
            'class','finally','long','strictfp','volatile','' +
            'const','float','native','super','while'
	    ]
        ,
        LANG_CLASSES: [
            'AbstractMethodError','AssertionError','ClassCircularityError',''+
            'ClassFormatError','Deprecated','EnumConstantNotPresentException',''+
            'ExceptionInInitializerError','IllegalAccessError',''+
            'IllegalThreadStateException','InstantiationError','InternalError',''+
            'NegativeArraySizeException','NoSuchFieldError','Override','Process',''+
            'ProcessBuilder','SecurityManager','StringIndexOutOfBoundsException',''+
            'SuppressWarnings','TypeNotPresentException','UnknownError',''+
            'UnsatisfiedLinkError','UnsupportedClassVersionError','VerifyError',''+
            'InstantiationException','IndexOutOfBoundsException',''+
            'ArrayIndexOutOfBoundsException','CloneNotSupportedException',''+
            'NoSuchFieldException','IllegalArgumentException','NumberFormatException',''+
            'SecurityException','Void','InheritableThreadLocal','IllegalStateException',''+
            'InterruptedException','NoSuchMethodException','IllegalAccessException',''+
            'UnsupportedOperationException','Enum','StrictMath','Package','Compiler',''+
            'Readable','Runtime','StringBuilder','Math','IncompatibleClassChangeError',''+
            'NoSuchMethodError','ThreadLocal','RuntimePermission','ArithmeticException',''+
            'NullPointerException','Long','Integer','Short','Byte','Double','Number','Float',''+
            'Character','Boolean','StackTraceElement','Appendable','StringBuffer',''+
            'Iterable','ThreadGroup','Runnable','Thread','IllegalMonitorStateException',''+
            'StackOverflowError','OutOfMemoryError','VirtualMachineError',''+
            'ArrayStoreException','ClassCastException','LinkageError',''+
            'NoClassDefFoundError','ClassNotFoundException','RuntimeException',''+
            'Exception','ThreadDeath','Error','Throwable','System','ClassLoader',''+
            'Cloneable','Class','CharSequence','Comparable','String','Object'
        ]
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.constant.ConstantImage');});