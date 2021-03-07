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
			click:()=>{
				webix.message({text:_("New element was added"), expire:350});
				const new_contact = { Name:"Name", Email:"Email", Status:0, Country:0};
				contacts.add(new_contact);
			}
		};

		const contacts_list = {
			view:"list",
			template:"#Name#, #Email# <span class='remove_list_item_btn webix_icon mdi mdi-close'></span>",
			scrollY:true,
			scrollX:false,
			select:true,
			on:{
				onAfterSelect:function(id){
					this.$scope.setParam("id", id, true);
				}
			},
			onClick:{
				remove_list_item_btn:function(e, id){
					webix.confirm({
						title:_("Contact data would be deleted"),
						text:_("Do you still want to continue?"),
						type:"confirm-warning"
					}).then(() => {

						webix.message({
							text:_("Element was deleted"),
							type:"info"
						});

						const prev_id = this.getPrevId(id);
						const next_id = this.getNextId(id);

						contacts.remove(id);

						if(prev_id){
							this.select(prev_id);
						}else{
							this.select(next_id);
						}

						return false;
					},
					function(){
						webix.message(_("Rejected"));
					}
					);
				}
			}
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

	init(view){
		const list = view.queryView("list");
		const id_url = this.getParam("id");

		list.parse(contacts);

		if(id_url && contacts.exists(id_url)){
			list.select(id_url);
		}else{
			list.select(list.getFirstId());
		}
	}

}
