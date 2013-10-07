var panel_loading = false;

function load_panel(link) {
	if(panel_loading) {
		return;
	}

	panel_loading = true;

	$.get (link, function (data) {
		$("#panel").append($(".nav_menu, #stream .day, #stream .flux, #stream .pagination", data));

		$("#panel .nav_menu").children().not("#nav_menu_read_all").remove();

		init_load_more($("#panel"));
		init_posts();
		init_stream_delegates($("#panel"));

		$("#overlay").fadeIn();
		$("#panel").slideToggle();

		panel_loading = false;
	});
}

function init_close_panel() {
	$("#panel .close").click(function() {
		$("#panel").html('<a class="close" href="#"><i class="icon i_close"></i></a>');

		init_close_panel();
		$("#panel").slideToggle();
		$("#overlay").fadeOut();
	});
}

function init_global_view() {
	$("#stream .category a").click(function() {
		var link = $(this).attr("href");

		load_panel(link);

		return false;
	});

	$(".nav_menu #nav_menu_read_all, .nav_menu .toggle_aside").remove();
}


$(document).ready (function () {
	init_global_view();
	init_close_panel();
});