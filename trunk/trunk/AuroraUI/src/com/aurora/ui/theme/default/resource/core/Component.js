Aurora.Component = Ext.extend(Ext.util.Observable,{
	constructor: function(config) {
        Aurora.Component.superclass.constructor.call(this);
        this.id = config.id;		
        window[this.id] = this;		
		this.initConfig=config;
		this.initComponent(config);
        this.initEvents();
    },
    initComponent : function(config){ 
		config = config || {};
        Ext.apply(this, config);
    },
    initEvents : function(){
    	this.addEvents('focus','blur','change','invalid','valid');    	
    },
    bind : function(ds, name){
    	this.binder = {
    		ds: ds,
    		name:name
    	}
    	var field =  ds.fields[this.binder.name];
    	if(field) {
			var config={};
			Ext.apply(config,this.initConfig);
			Ext.apply(config, field.pro);
			delete config.name;
			delete config.type;
			this.initComponent(config);
			
    	}
    	ds.on('metachange', this.onRefresh, this);
    	ds.on('valid', this.onValid, this);
//    	ds.on('update', this.onUpdate, this);
    	ds.on('clear', this.onClear, this);
    	ds.on('fieldchange', this.onFieldChange, this);
    	ds.on('indexchange', this.onRefresh, this);
    },
    onRefresh : function(ds){
		this.record = ds.getCurrentRecord();
		if(this.record) {
			var value = this.record.get(this.binder.name);
			var field = this.record.getMeta().getField(this.binder.name);		
			var config={};
			Ext.apply(config,this.initConfig);		
			Ext.apply(config, field.snap);		
			this.initComponent(config);
			this.setValue(value,true);
		}
    },
    onValid : function(ds, record, name, valid){
    	if(this.binder.ds == ds && this.binder.name == name || this.record == record){
	    	if(valid){
    			this.clearInvalid();
	    	}else{
	    		this.markInvalid();
	    	}
    	}    	
    },
//    onUpdate : function(ds, record, name){
//    	if(this.binder.ds == ds && this.binder.name == name){
//    		var record = ds.getCurrentRecord();
//			var value = record.get(this.binder.name);
//	    	this.setValue(value);
//    	}
//    },
    onFieldChange : function(ds, record, field){
    	if(this.binder.ds == ds && this.binder.name == field.name){
	    	this.onRefresh(ds);   	
    	}
    },
    onClear : function(ds){
    	this.clearValue();    
    },    
    setValue : function(v, silent){
    	this.value = v;
    	if(silent === true)return;
    	if(this.binder){
    		var r = this.binder.ds.getCurrentRecord();
    		if(r == null){
    			r = this.binder.ds.newRecord();
    		}
    		r.set(this.binder.name,v);
    		if(v=='') delete r.data[this.binder.name];
    	}
    },
    clearValue : function(){},
    initMeta : function(){},
    setDefault : function(){},
    setRequired : function(){},
    onDataChange : function(){}
});