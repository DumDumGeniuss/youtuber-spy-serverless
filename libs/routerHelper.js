exports.restfulRecognition = function (path, method) {
	let action;
	let thePath = path || '/';
	let checkNumber = thePath.split('/').length;
	let id = thePath.split('/')[1];

	if (checkNumber !== 2) {
		action = 'no';
	} else if (!id && method === 'GET') {
		action = 'query';
	} else if (!id && method === 'POST') {
		action = 'create';
	} else if (id && method === 'GET') {
		action = 'get';
	} else if (id && method === 'PUT') {
		action = 'update';
	} else if (id && method === 'DELETE') {
		action = 'delete';
	} else {
		action = 'no';
	}

	return {
		action,
		id,
	};
};