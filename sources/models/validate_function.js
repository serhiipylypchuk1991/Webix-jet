export function textValidation(value,rightLength){
	//const regExpResolt = value.search(/[\§\<\>\@\#\$\^\&\*\+\=\\\~\[\]\{\}\|\_]/g),
	const regExpResolt = value.search(/[§<>@#$^&*+=~[]{}|_]/g),
		argLength = value.length;
	if(regExpResolt === -1 && argLength >= 1 && argLength <= rightLength){
		return value;
	}else{
		return false;
	}
}
