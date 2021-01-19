
import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
    var segmented_tab ={
        view:"segmented", id:"selector", inputWidth:500,
        options:[
          {id:1, value:"En"},
          {id:2, value:"Ru"},

        ],
        on:{
          onChange:function(){
            //console.log(this.getValue());
            webix.message("Language was switched");
          }
        }
    };
		return segmented_tab;
	}

}
