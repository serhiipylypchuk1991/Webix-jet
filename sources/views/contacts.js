import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {textValidation} from "models/validate_function";
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
						{margin:20, cols:[
							{view:"button", value:"Save", css:"webix_primary", click:() => this.saveHandler("contacts_form")},
							{view:"button", value:"Clear", css:"webix_secondary", click:() => this.clearHandler("contacts_form")}
						]}
					]
				},{}
			],
			rules:{
		    Name:function(value){
					return textValidation(value,20);
				},
				Email:webix.rules.isEmail
			}
		};
		return {
			cols:[
				contacts_list,
				contacts_form
			]
		};
	}
	init(){
		webix.$$("contacts_list").parse(contacts);
	}
	clearHandler(form_id){
		var form_collection = webix.$$(form_id);
		webix.confirm({
			title:"Form would be cleared",
			text:"Do you still want to continue?",
			type:"confirm-warning"
		}).then(
		function(){
			form_collection.clear();
			form_collection.clearValidation();
		},
		function(){
			webix.message("Rejected");
		});
	}
	saveHandler(form_id){
		var form_collection = webix.$$(form_id);
		if(form_collection.validate()){
			webix.message({
				text:"Data has edited successfully",
				type:"success",
				expire:3000
			});
			form_collection.clear();
		}else{
			webix.message({
				text:"Please, enter the correct data in the fields of the form",
				type:"error",
				expire:3000
			});
		}
	}
}
