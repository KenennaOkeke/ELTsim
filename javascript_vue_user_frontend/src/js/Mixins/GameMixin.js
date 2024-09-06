import axios from 'axios'

export default {
	methods: {
		clear() {
			const vm = this;
			vm.config.inputData.inputs.forEach(input => {
				document.getElementById("inputData_" + input.name).value = 0;
			});
			const outputDataFields = document.getElementsByClassName("output-data");
			for (let i = 0; i < outputDataFields.length; i++) {
				document.getElementsByClassName("output-data")[i].innerHTML = '';
			}
			vm.config.graphData = {
				revenue: [],
				profit: [],
				cost: []
			};
			vm.clearErrors();
		},
		showPage(page) {
			const vm = this;
			const pageItem = vm.config.pageData.pages[page]
			vm.dynamicModalPageComponent.title = pageItem.title;
			vm.dynamicModalPageComponent.content = pageItem.content;
			vm.dynamicModalPageComponent.open = true;
		},
		clearErrors() {
			const vm = this;
			vm.config.inputData.inputs.forEach(input => {
				input.error = null;
			});
		},
		compute() {
			const vm = this;
			vm.clearErrors();
			const formData = new FormData();
			vm.config.inputData.inputs.forEach(input => {
				formData.append(input.name, document.getElementById("inputData_" + input.name).value);
			});
			formData.append('username', vm.username)
			axios({
				method: 'post',
				url: vm.backendHost + '/api/v1/' + vm.gameName + '/compute',
				data: formData,
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(function (response) {
					if (response.data.success) {
						Number.prototype.toLocaleFixed = function (n) {
							return this.toLocaleString(undefined, {
								minimumFractionDigits: n,
								maximumFractionDigits: n
							});
						};
						for (const [key1, value1] of Object.entries(response.data.data.outputData)) {
							for (let key = 0; key < value1.length; key++) {
								console.log(value1)
								const value = value1[key];
								switch (document.getElementById("outputData_" + key1 + "_" + key).getAttribute('t')) {
									case "integer":
										document.getElementById("outputData_" + key1 + "_" + key).innerHTML = (value).toLocaleFixed(0);
										break;
									case "decimal-2":
										document.getElementById("outputData_" + key1 + "_" + key).innerHTML = Number(value).toLocaleFixed(2);
										break;
									case "currency":
										if (Number(value) > 0) {
											document.getElementById("outputData_" + key1 + "_" + key).innerHTML = "$" + Number(value).toLocaleFixed(0);
										} else {
											document.getElementById("outputData_" + key1 + "_" + key).innerHTML = "-$" + Number(Math.abs(value)).toLocaleFixed(0);
										}
										break;
									case "currency-2":
										if (Number(value) > 0) {
											document.getElementById("outputData_" + key1 + "_" + key).innerHTML = "$" + Number(value).toLocaleFixed(2);
										} else {
											document.getElementById("outputData_" + key1 + "_" + key).innerHTML = "-$" + Number(Math.abs(value)).toLocaleFixed(2);
										}
										break;
									case "string":
										document.getElementById("outputData_" + key1 + "_" + key).innerHTML = (value);
										break;
									case "percentage":
										document.getElementById("outputData_" + key1 + "_" + key).innerHTML = Number(value).toLocaleFixed(0) + "%";
										break;
									case "percentage-2":
										document.getElementById("outputData_" + key1 + "_" + key).innerHTML = Number(value).toLocaleFixed(2) + "%";
										break;
								}
							}
						}
						vm.config.graphData = response.data.data.graphData;
					} else {
						for (const [key, error] of Object.entries(response.data.errors)) {
							vm.config.inputData.inputs.forEach(input => {
								if (key === input.name) {
									input.error = error;
								}
							});
						}
					}
				})
				.catch(function (error) {
					alert("Please refresh the page and try again");
				});
		},
		getConfig() {
			const vm = this;
			axios({
				method: 'get',
				url: vm.backendHost + '/api/v1/' + vm.gameName + '/config',
			})
				.then(function (response) {
					if (response.status === 200 && response.data.success === true) {
						vm.config = response.data.data;
					}
				})
		},
	}
};