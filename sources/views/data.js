import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";

export default class DataView extends JetView{
	config(){

		function tab_datatable(component_id, component){

			var add_new_button = {
				view:"button",
				value:"Add new",
				css:"webix_primary",
		    click:function(){
		      webix.message({text:"New element was added", expire:350});
		      $$(component_id).add({Name:component});
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
				editable:true
			};
			return {margin:3, rows:[add_new_button,datatable]};
		}

		var tabview = {
	    view:"tabview",
	    cells:[
	      {
	        header:"Countries",
	        body:tab_datatable("countries_datatable", "Country")
	      },
	      {
					header:"Statuses",
	        body:tab_datatable("statuses_datatable", "Status")
	 			}
	    ]
		};
		
		return tabview;
	}

	init(view){
		$$("countries_datatable").parse(countries);
		$$("statuses_datatable").parse(statuses);
	}

}
