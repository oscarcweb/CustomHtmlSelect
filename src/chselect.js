/**
 * Custom Html Select
 *
 * Writted by		oscarcweb
 * Url			 	oscarcweb.com
 *
 */

if (typeof chs === 'undefined') {
	var chs = {};
}

if (document.querySelectorAll((chs.selector ?? 'select'))) {

	var count = 0;

	document.querySelectorAll((chs.selector ?? 'select')).forEach(custom => {

		if (custom.tagName.toLowerCase() === 'select') {

			var nn = custom.name, name = '', items = '', options = chs.options ? chs.options : 'list float';

			if (custom.hasAttribute("data-chsoptions")) {
				options = custom.getAttribute("data-chsoptions");
			}

			custom.querySelectorAll("option").forEach(i => {
				count++;

				if (i.hasAttribute("disabled")) {
					name = i.text;
				}
				else {
					if (i.hasAttribute("selected")) {
						var c = ' checked';
						name = i.text;
					}
					var img = i.getAttribute("data-chsimg") ? '<img class="chsimg" src="' + i.getAttribute("data-chsimg") + '" alt="' + i.text + '"> ' : '';
					items += '<input id="chs_' + count + '" name="' + nn + '" type="radio" value="' + i.value + '"' + (c ?? '') + '><label for="chs_' + count + '">' + img + i.text + '</label>';
				}

			});

			name = (name) ? name : (chs.title ? chs.title : '-- Choose one --');

			let hhtml = '<div id="chs_ocw" class="chs" data-chsoptions="' + options + '"><div class="chs_name">' + name + '</div><div class="chs_items chs_none">' + items + '</div></div>';
			custom.outerHTML = hhtml;
			custom = document.getElementById("chs_ocw");
			custom.removeAttribute("id");

		}

		if (custom.getAttribute("data-chsoptions") && custom.getAttribute("data-chsoptions").indexOf("search") != -1) {
			custom.querySelector(".chs_items").insertAdjacentHTML('afterbegin', '<input type="text" class="search_box" placeholder="' + (chs.search ? chs.search : '&#x1F50D') + '">');
			custom.querySelector(".search_box").addEventListener("input", function () {

				let filter = this.value.toLowerCase();

				custom.querySelectorAll(".chs_items > label").forEach(label => {

					if (label.textContent.toLowerCase().indexOf(filter) != -1) {
						label.removeAttribute("style");
					}
					else {
						label.style.display = 'none';
					}

				});
			});
		}

		custom.querySelector(".chs_name").addEventListener("click", function () {

			if (custom.querySelector(".chs_items").classList.contains("chs_none")) {
				custom.querySelector(".chs_items").classList.remove("chs_none");
			}
			else {
				custom.querySelector(".chs_items").classList.add("chs_none");
			}

			custom.querySelectorAll('label').forEach(element => {
				element.addEventListener("click", () => {

					if (custom.querySelector(".search_box")) {
						custom.querySelector(".search_box").value = '';
						custom.querySelectorAll(".chs_items > label").forEach(label => {
							label.removeAttribute("style");
						});
					}

					custom.querySelector(".chs_name").innerHTML = element.innerHTML;
					custom.querySelector(".chs_items").classList.add("chs_none");

				});
			});

		});

	});

}

