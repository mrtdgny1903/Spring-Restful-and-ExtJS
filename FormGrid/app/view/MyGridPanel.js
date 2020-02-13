 Ext.define('MyApp.view.MyGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygridpanel',

    requires: [
        'MyApp.view.MyGridPanelViewModel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table'
    ],


    viewModel: {
        type: 'mygridpanel'
    },
    height: 300,
    id: 'mygrid',
    width: 900,
    title: 'Employees',
    margin : "-200 10 10 0",
    store: Ext.data.StoreManager.lookup('EmployeeStore'),
    renderTo: Ext.getBody(),

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'id',
            id: 'grid_id'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Name',
            id: 'grid_name'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'lastName',
            text: 'Last Name',
            id: 'grid_lastName'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'active',
            text: 'Condition',
            id: 'grid_condition'
        },

    ]


});
