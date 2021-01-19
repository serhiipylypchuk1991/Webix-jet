export const useful_functions = {

	titleValidation(value,rightLength){
		var regExpResolt = value.search(/[\§\<\>@#\$\^&\*\+=\\~\[\]\{\}\|_]/g),
				argLength = value.length;
		if(regExpResolt === -1 && argLength >= 1 && argLength <= rightLength){
			return value;
		}else{
			return false;
		}
	},

	scrollToLastAddedElement(component,show,select){
		var data_obj = component.data.pull;
		var last_id = Object.keys(data_obj)[Object.keys(data_obj).length-1];
			if(last_id){
				if(show === true && select === true){
					component.showItem(last_id);
					component.select(last_id);
				}else{
					component.showItem(last_id);
				}
			}else{console.log("Incorrect last_id");}
	}

};
