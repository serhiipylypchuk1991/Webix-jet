import {JetView} from "webix-jet";
import {contacts} from "models/contacts";

export default class ContactsView extends JetView{
	config(){
		var contacts_list = {
			view:"list",
			id:"contacts_list",
			template:"#Name#, #Email#",
			scrollY:true,
			scrollX:false,
			select:true
		};

		var contacts_form = {
      view:"form",
      id:"contacts_form",
      width:350,
      elements:[
        {
          margin:10,
          rows:[
            {template:"EDIT CONTACTS", type:"section"},
            {view:"text", label:"Name", name:"Name", invalidMessage:"Enter correct Name"},
            {view:"text", label:"Email", name:"Email", invalidMessage:"Enter correct Email"},
						{
							margin:20, cols:[
								{view:"button", value:"Save", css:"webix_primary",
		              click:function(){
										webix.message({
											text:"Save",
											type:"success",
											expire:3000
										});
		              }
		            },
		            {view:"button", value:"Clear", css:"webix_secondary",
		              click:function(){
										webix.message({
											text:"Clear",
											type:"success",
											expire:3000
										});
		              }
		            },
							]
						}
          ]
        },{}
      ]
    };

		return {
			cols:[
				contacts_list,
				contacts_form
			]
		};

	}
	init(view){
		$$("contacts_list").parse(contacts);
	}
}
