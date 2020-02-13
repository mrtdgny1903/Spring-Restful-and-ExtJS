



// Define a kadar Grid//
Ext.create('Ext.data.Store', {
    storeId: 'EmployeeStore',
    fields: ['id','name', 'lastName', 'active'],
    autoLoad: true,
    remoteSort: true,
    proxy: {
        autoSync:true,
        autoSave:true,

        type: 'ajax',
        url: 'http://localhost:8080/employee/',
        reader: {
            type: 'json',
            rootProperty: 'result.employees'
        }
    }
});



Ext.create('Ext.grid.Panel', {
    title: 'Employees',
    margin:'20 940 20 940',
    store: Ext.data.StoreManager.lookup('EmployeeStore'),
    columns: [{
        text: 'Id',
        dataIndex: 'id',
        editor: 'textfield',
        flex: 1
    },{
        text: 'Name',
        dataIndex: 'name',
        editor: 'textfield',
        flex: 1
    }, {
        text: 'Last Name',
        dataIndex: 'lastName',
        editor: 'textfield',
        flex: 1
    }, {
        text: 'Condition',
        dataIndex: 'active',
        editor: 'textfield',
        flex: 1
    }],
    selModel: {
       selType: 'rowmodel', // rowmodel is the default selection model
       mode: 'MULTI' // Allows selection of multiple rows
    },
    selectable: {
        columns: false, // Can select cells and rows, but not columns
        extensible: true // Uses the draggable selection extender
    },
    plugins: [{
        ptype: 'rowediting',
        clicksToEdit: 2
    }],
    height: 600,
    width: 900,
    renderTo: Ext.getBody()
});


Ext.define('MyApp.view.MemberGrid', {
extend: 'Ext.grid.Panel',
alias: 'widget.membergrid',



initComponent: function(){

    var me = this;

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');

    var store = Ext.getStore('EmployeeStore');

    Ext.apply(this, {
        height: 900,
        width:900,
        margin:'60 940 60 940',
        plugins: [rowEditing],
        store: store,
        stripeRows: true,
        columnLines: true,
        selModel: {
       selType: 'rowmodel', // rowmodel is the default selection model
       mode: 'MULTI' // Allows selection of multiple rows
    },
        columns: [{
            id       :'id',
            text: 'Id',
            width: 40,
            flex:1,
            sortable: true,
            dataIndex: 'id',

        },{
            text   : 'Name',
            flex: 1,
            sortable : true,
            dataIndex: 'name',
            field: {
                xtype: 'textfield'
            }
        },{
            text   : 'LastName',
            width    : 150,
            sortable : true,
            flex:1,
            dataIndex: 'lastName',
            field: {
                xtype: 'textfield'
            }
        },{
            text   : 'Condition',
            flex:1,
            width    : 200,
            editable: false,
            sortable : true,
            dataIndex: 'active',
            field: {
                xtype: 'textfield'
            }
        }],
        dockedItems: [


            {
            xtype: 'toolbar',
            items: [//{
                //text: 'Add',
                //iconCls: 'icon-add',
                //handler: function(){
                    // empty record
                   // store.insert(0, new User.model.user);
                   // rowEditing.startEdit(0, 0);
               // }
            //},


           {
    text: 'Delete Item',
    iconCls: 'icon - delete ',
    handler: function () {
                var selection = me.getView().getSelectionModel().getSelection()[0];
                var id_s = me.getView().getSelectionModel().getSelection()[0].get('id');
                var name_s = me.getView().getSelectionModel().getSelection()[0].get('name');          //SEÇİLEN ROW'UN BİLGİLERİNİ ALDIM.
                var lastName_s = me.getView().getSelectionModel().getSelection()[0].get('lastName');
                var active_s = me.getView().getSelectionModel().getSelection()[0].get('active');

            if (selection) {

                 var url = 'http://localhost:8080/employee/' + selection.id ;

                 var data = {} ;
data.id = id_s;
data.name = name_s;
data.lastName  = lastName_s;
data.active = active_s;




                 var json = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.open("DELETE", url, true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function () {
	var user = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "201") {
		console.table(user);
	} else {
		console.error(user);
	}
}
xhr.send(json);

store.load();


        }

        store.reload();

    }
},'-',{
                text: 'Save Item',
                iconCls: 'icon-save',
                handler: function(){
                  var selection = me.getView().getSelectionModel().getSelection()[0];
                  var id_s = me.getView().getSelectionModel().getSelection()[0].get('id');
                  var name_s = me.getView().getSelectionModel().getSelection()[0].get('name');          //SEÇİLEN ROW'UN BİLGİLERİNİ ALDIM.
                  var lastName_s = me.getView().getSelectionModel().getSelection()[0].get('lastName');
                  var active_s = me.getView().getSelectionModel().getSelection()[0].get('active');

                    if (selection){

                        var url = 'http://localhost:8080/employee/' + selection.id ;

var data = {}
    ;
data.id = id_s;
data.name = name_s;
data.lastName  = lastName_s;
data.active = active_s;

var json = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.open("PUT", url, true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function () {
	var user = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "201") {
		console.table(user);
	} else {
		console.error(user);
	}
}
xhr.send(json);

store.load();

                      /*  store.sync({
                        success: function(response){
                            store.load()
                        }
                    });
                        //store sync
*/
                }
                store.reload();


                        }


            },{
                text: 'Refresh',
                handler: function(){
                    store.load();
                }
            }]
        }]
    });

    this.callParent(arguments);
    }
});

Ext.define('MyApp.view.MyFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myform',



    onButtonClick: function(button, e, eOpts) {


        let id;//Değişkenlerin alınması
        let name = Ext.getCmp('name').getValue();
        let lastname = Ext.getCmp('lastname').getValue();
        let isActive;
        let radios = document.getElementsByName('radiogroup');//Radio Group




         for (var i = 0, length = radios.length; i < length; i++)
        {
            if (radios[i].checked)
            {
                // do whatever you want with the checked radio
                console.log('Active');

                isActive = 'Active';

                break;

                // only one radio can be logically checked, don't check the rest
            }else {
                console.log('Passive');

                isActive = 'Passive';

                break;

            }
        }
        console.log(id);
        console.log(name);
        console.log(lastname);



        // Post a user
var url = "http://localhost:8080/employee/";

var data = {}
    ;
//data.id = id;
data.name = name;
data.lastName  = lastname;
data.active = isActive;

var json = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.open("POST", url, true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function () {
	var user = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "201") {
		console.table(user);
	} else {
		console.error(user);
	}
}
xhr.send(json);


 //console.log(data);
 //Ext.data.StoreManager.lookup('EmployeeStore').add(data);
 Ext.getStore('EmployeeStore').reload(data);



},
    onDeleteButtonClick: function(button, e, eOpts) {


        //let id;//Değişkenlerin alınması
        let name = Ext.getCmp('name').getValue();
        let lastname = Ext.getCmp('lastname').getValue();
        let isActive;


        // Delete all users
var url = "http://localhost:8080/employee/";

var data = {}
    ;
//data.id = id;
data.name = name;
data.lastName  = lastname;
data.active = isActive;

var json = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.open("DELETE", url, true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function () {
	var user = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "201") {
		console.table(user);
	} else {
		console.error(user);
	}
}
xhr.send(json);


        //Ext.data.StoreManager.lookup('EmployeeStore').removeAll(data);
       // Ext.data.StoreManager.lookup('EmployeeStore').loadData(data);
        //Ext.data.StoreManager.lookup('EmployeeStore').deleteData(data);
        Ext.getStore('EmployeeStore').reload(data); //Grid i refresh yapan kod


     },

    });






