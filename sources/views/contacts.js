import {JetView} from "webix-jet";
import FormView from "views/form";
import {contacts} from "models/contacts";

export default class ContactsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const add_new_button = {
			view:"button",
			value:_("Add new"),
			css:"webix_primary",
			click:() => this.addContact()
		};

		const contacts_list = {
			view:"list",
			template:"#Name#, #Email# <span class='remove_list_item_btn webix_icon mdi mdi-close'></span>",
			scrollY:true,
			scrollX:false,
			select:true,
			on:{ onAfterSelect:(id) => this.selectContact(id)},
			onClick:{ remove_list_item_btn:(e,id) => this.removeContact(id) }
		};

		return {
			cols:[
				{rows:[
					contacts_list,
					add_new_button
				]},
				FormView
			]
		};
	}

	addContact(){
		const _ = this.app.getService("locale")._;
		webix.message({text:_("New element was added"), expire:350});
		const new_contact = { Name:"Name", Email:"Email", Status:0, Country:0};
		contacts.add(new_contact);

		const new_id = contacts.getLastId();
		this.getRoot().queryView("list").select(new_id);
	}
	removeContact(id){
		const _ = this.app.getService("locale")._;
		webix.confirm({
			title:_("Contact data would be deleted"),
			text:_("Do you still want to continue?"),
			type:"confirm-warning"
		}).then(() => {
			webix.message({
				text:_("Element was deleted"),
				type:"info"
			});

			contacts.remove(id);
			this.show("contacts");
			return false;
		},
		function(){
			webix.message(_("Rejected"));
		});
	}
	selectContact(id){
		this.setParam("id", id, true);
	}

	init(view){
		const list = view.queryView("list");
		list.parse(contacts);
	}

	urlChange(view){
		const list = view.queryView("list");
		const url_id = this.getParam("id");
		const first_id = contacts.getFirstId();

		if(url_id && contacts.exists(url_id)){
			list.select(url_id);
		}else if(first_id){
			list.select(first_id);
		}
	}

}
