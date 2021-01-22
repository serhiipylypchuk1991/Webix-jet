export function textValidation(value,rightLength){
	var regExpResolt = value.search(/[§<>@#$^&*+=\\~[]{}|_]/g),
		argLength = value.length;
	if(regExpResolt === -1 && argLength >= 1 && argLength <= rightLength){
		return value;
	}else{
		return false;
	}
}
