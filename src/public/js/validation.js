function val_number(num) {
	return (num.match(/\d/g).length != 10);
}

function val_name(name) {
	return (/[^a-zA-Z]/.test(name));
}

function pass_len(pass) {
	return (pass.length < 6);
}

function pass_alpha_num(pass) {
	return (pass.match(/\d/g) == null || pass.match(/[^a-zA-Z]/) == null);
}

function pass_match(pass1, pass2) {
	return (pass1 != pass2);
}

function data_init(user) {
	var data = {};
	data["1"] = user;
	localStorage.setItem('Users', JSON.stringify(data));
}

function add_to_data(user) {
	var data = JSON.parse(localStorage.getItem('Users'));
	var temp = user;
	if (data == null)
		data_init(temp);
	else {
		var len = Object.keys(data).length
		data["" + (len + 1)] = user;
		window.alert(Object.keys(data).length)
		localStorage.setItem('Users', JSON.stringify(data));
	}

}

function val(form) {
	if (val_name(form.name.value)) {
		window.alert("Name can only contain characters.");
		return false;
	}
	if (val_number(form.phno.value)) {
		window.alert("Invalid Phone Number.");
		return false;
	}
	if (pass_len(form.pass.value)) {
		window.alert("Password too short.");
		return false;
	}
	if (pass_alpha_num(form.pass.value)) {
		window.alert("Password must be alpha-numeric.");
		return false;
	}
	if (pass_match(form.pass.value, form.cpass.value)) {
		window.alert("Passwords don't match.");
		return false;
	}
	var user = {
		'Name': form.name.value,
		'Phone': form.phno.value,
		'Email': form.email.value,
		'Password': form.pass.value
	};
}