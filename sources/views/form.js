import {JetView} from "webix-jet";
import {textValidation} from "models/validate_function";
import {countries} from "models/countries";
import {statuses} from "models/statuses";
import {contacts} from "models/contacts";

export default class FormView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const form = {
			view:"form",
			width:350,
			elements:[
				{ type:"section", template:_("edit contact") },
				{ view:"text", label:_("Name"), name:"Name", invalidMessage:_("Enter correct Name") },
				{ view:"text", label:_("Email"), name:"Email", invalidMessage:_("Enter correct Email") },
				{ view:"combo", label:_("Country"), name:"Country", options:{data:countries}},
				{ view:"combo", label:_("Status"), name:"Status", options:{data:statuses}},
				{
					margin:10, cols:[
						{ view:"button", value:_("Save"), css:"webix_primary", click:() => this.saveHandler()},
						{ view:"button", value:_("Clear"), css:"webix_secondary", click:() => this.clearHandler() }
					]
				},
				{}
			],
			rules:{
				Name:function(value){
					return textValidation(value,20);
				},
				Email:webix.rules.isEmail
			}
		};

		return form;
	}

	urlChange(view){
		const id_url = this.getParam("id");
		const exist_id = contacts.exists(id_url);

		if(id_url && exist_id){
			const form_data = contacts.getItem(id_url);
			view.parse(form_data);
		}
	}

	clearHandler(){
		const _ = this.app.getService("locale")._;
		const form_collection = this.getRoot();
		webix.confirm({
			title:_("Form would be cleared"),
			text:_("Do you still want to continue?"),
			type:"confirm-warning"
		}).then(
			function(){
				form_collection.clear();
				form_collection.clearValidation();
			},
			function(){
				webix.message(_("Rejected"));
			});
	}

	saveHandler(){
		const _ = this.app.getService("locale")._;
		const form_collection = this.getRoot();
		const values = form_collection.getValues();

		if(form_collection.validate()){
			contacts.updateItem(values.id, values);

			webix.message({
				text:_("Data has edited successfully"),
				type:"success",
				expire:3000
			});
			//form_collection.clear();
		}else{
			webix.message({
				text:_("Please, enter the correct data in the fields of the form"),
				type:"error",
				expire:3000
			});
		}
	}

}
