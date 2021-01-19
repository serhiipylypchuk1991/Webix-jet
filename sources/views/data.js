import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";
import {useful_functions} from "models/useful";

export default class DataView extends JetView{
	config(){

		var tabview = {
	    view:"tabview",
	    cells:[
	      {
	        header:"Countries",
	        body:this.tab_datatable_element("countries_datatable", "Country")
	      },
	      {
					header:"Statuses",
	        body:this.tab_datatable_element("statuses_datatable", "Status")
	 			}
	    ]
		};

		return tabview;
	}

	init(view){
		$$("countries_datatable").parse(countries);
		$$("statuses_datatable").parse(statuses);
	}

	tab_datatable_element(component_id, component){

		var add_new_button = {
			view:"button",
			value:"Add new",
			css:"webix_primary",
			click:function(){
				webix.message({text:"New element was added", expire:350});
				$$(component_id).add({Name:component});
				useful_functions.scrollToLastAddedElement($$(component_id),true,true)
			}
		};

		var datatable = {
			view:"datatable",
			id:component_id,
			select:true,
			scrollY:true,
			minWidth:400,
			columns:[
				{ id:"Name", header:component, editor:"text", fillspace:true, sort:"text"},
				{ id:"del", header:"", template:"{common.trashIcon()}", width:60}
			],
			onClick:{
				"wxi-trash":function(e, id){

					webix.confirm({
						title:component+" would be deleted",
						text:"Do you still want to continue?",
						type:"confirm-warning"
					}).then(() => {

							webix.message({
								text:component+" was deleted",
								type:"info"
							});

							this.remove(id);
							return false;
						},
						function(){
							 webix.message("Rejected");
						}
					);
				}
			},
			on:{
				onValidationError:function(id){
					this.unselect(id);
				}
			},
			editable:true,
			rules:{
				Name:function(value){
					return useful_functions.titleValidation(value,20);
				}
			}
		};

		return {margin:3, rows:[add_new_button,datatable]};
	}

}
