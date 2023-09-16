'use strict';

class cmd
{
	name;
	format;
	range;

	constructor(the_name, the_format, the_range)
	{
		this.name = the_name;
		this.format = the_format;
		this.range = the_range;
	}
}


var which = "none";
var length = 0;
var other_length = 0;

var cmds_arr = [];

var init_cmd;


function setArray()
{
	which = "arr";

	document.getElementById("length_div").style.display = "block";
	document.getElementById("range_num_div").style.display = "block";
	document.getElementById("sort_div").style.display = "block";
	document.getElementById("submit_div").style.display = "block";

	document.getElementById("range_char_div").style.display = "none";
	document.getElementById("length_col_div").style.display = "none";
	document.getElementById("length_row_div").style.display = "none";
	document.getElementById("init_cmd_div").style.display = "none";
	document.getElementById("other_cmds_div").style.display = "none";

	document.getElementById("other_result").innerText = "";
	document.getElementById("result").innerText = "";
}

function setString()
{
	which = "str";

	document.getElementById("length_div").style.display = "block";
	document.getElementById("range_char_div").style.display = "block";
	document.getElementById("submit_div").style.display = "block";

	document.getElementById("range_num_div").style.display = "none";
	document.getElementById("length_col_div").style.display = "none";
	document.getElementById("length_row_div").style.display = "none";
	document.getElementById("init_cmd_div").style.display = "none";
	document.getElementById("other_cmds_div").style.display = "none";
	document.getElementById("sort_div").style.display = "none";

	document.getElementById("other_result").innerText = "";
	document.getElementById("result").innerText = "";
}

function setMatrix()
{
	which = "mat";

	document.getElementById("length_col_div").style.display = "block";
	document.getElementById("length_row_div").style.display = "block";
	document.getElementById("range_num_div").style.display = "block";
	document.getElementById("submit_div").style.display = "block";

	document.getElementById("length_div").style.display = "none";
	document.getElementById("range_char_div").style.display = "none";
	document.getElementById("init_cmd_div").style.display = "none";
	document.getElementById("other_cmds_div").style.display = "none";
	document.getElementById("sort_div").style.display = "none";

	document.getElementById("other_result").innerText = "";
	document.getElementById("result").innerText = "";
}

function setCommands()
{
	which = "com";

	document.getElementById("init_cmd_div").style.display = "block";
	document.getElementById("other_cmds_div").style.display = "block";
	document.getElementById("length_div").style.display = "block";
	document.getElementById("submit_div").style.display = "block";

	document.getElementById("length_col_div").style.display = "none";
	document.getElementById("length_row_div").style.display = "none";
	document.getElementById("range_num_div").style.display = "none";
	document.getElementById("range_char_div").style.display = "none";
	document.getElementById("sort_div").style.display = "none";

	document.getElementById("other_result").innerText = "";
	document.getElementById("result").innerText = "";
}

function generate()
{
	//console.log("generating");
	var result = "";

	if (which == "arr" && document.getElementById("sorted").checked)
	{
		var arr = [];

		var max = cmds_arr[0].range.length;

		for (var i=0; i<length; i++)
		{
			var index = Math.floor(Math.random() * max);
			arr.push(Number(cmds_arr[0].range[index]));
		}

		arr.sort(function(a, b){return a - b});

		document.getElementById("result").innerText = "["+arr+"]";
	}
	else if (which == "arr" || which == "str" || which == "mat")
	{
		if (which == "arr" || which == "mat")
			result = "[";

		var max = cmds_arr[0].range.length;

		for (var i=0; i<length; i++)
		{
			if (which == "arr" || which == "str")
			{
				var index = Math.floor(Math.random() * max);
				if (isNaN(Number(cmds_arr[0].range[index])) && which == "arr")
					result += ("\""+cmds_arr[0].range[index]+"\"");
				else
					result += (cmds_arr[0].range[index] + "");
			}
			else if (which == "mat")
			{
				result += "[";
				for (var j=0; j<other_length; j++)
				{
					var index = Math.floor(Math.random() * max);
					if (isNaN(Number(cmds_arr[0].range[index])) && which == "mat")
						result += ("\""+cmds_arr[0].range[index]+"\"");
					else
						result += (cmds_arr[0].range[index] + "");

					if (j < other_length-1)
						result += ",";
				}
				result += "]";
			}

			if (i < length-1 && (which == "arr" || which == "mat"))
				result += ",";
		}

		if (which == "arr" || which == "mat")
			result += "]";
	}
	else if (which == "com")
	{
		var other_result = "[";

		result += "["+init_cmd.name;

		var max = init_cmd.range.length;
		var index = Math.floor(Math.random() * max);
		if (isNaN(Number(init_cmd.range[index])))
			other_result += "\""+init_cmd.range[index]+"\"";
		else
			other_result += init_cmd.range[index];

		result += ",";
		other_result += ",";

		for (var i=0; i<length; i++)
		{
			max = cmds_arr.length;
			index = Math.floor(Math.random() * max);

			result += cmds_arr[index].name;

			var other_max = cmds_arr[index].range.length;
			var other_index = Math.floor(Math.random() * other_max);
			if (isNaN(Number(cmds_arr[index].range[other_index])))
				other_result += "\""+cmds_arr[index].range[other_index]+"\"";
			else
				other_result += cmds_arr[index].range[other_index];

			if (i<length-1)
			{
				result += ",";
				other_result += ",";
			}
		}


		result += "]";
		other_result += "]";

		document.getElementById("other_result").innerText = other_result;
	}
		
	if (!document.getElementById("sorted").checked)
		document.getElementById("result").innerText = result;

	cmds_arr = [];
}

function submit()
{
	//console.log("submitting");
	if (which == "arr" || which == "str" || which == "com")
	{
		length = Number(document.getElementById("length_text").value);
		if (isNaN(length) || document.getElementById("length_text").value == "")
		{
			alert("Please input a valid number for length");
			return;
		}
	}
	else if (which == "mat")
	{
		other_length = Number(document.getElementById("length_text_col").value);
		if (isNaN(other_length) || document.getElementById("length_text_col").value == "")
		{
			alert("Please input a valid number for number of columns");
			return;
		}

		length = Number(document.getElementById("length_text_row").value);
		if (isNaN(length) || document.getElementById("length_text_row").value == "")
		{

			alert("Please input a valid number for number of rows");
			return;
		}
	}

	if (which == "arr" || which == "mat")
	{
		var range_arr = [];

		if (document.getElementById("distinct").checked)
		{
			var temp = document.getElementById("distinct_text").value.split(",");

			for (var i=0; i<temp.length; i++)
				range_arr.push(temp[i]);
		}
		else
		{
			var from = Number(document.getElementById("from_text").value);
			var to = Number(document.getElementById("to_text").value);
			if (isNaN(from) || document.getElementById("from_text").value == "" || isNaN(to) || document.getElementById("to_text").value == "")
			{
				alert("Please input a valid number for range");
				return;
			}
			
			for (var i=from; i<=to; i++)
				range_arr.push(i);
		}

		cmds_arr.push(new cmd("i", "i", range_arr));
	}
	else if (which == "str")
	{
		var from = document.getElementById("from_text_char").value;
		var to = document.getElementById("to_text_char").value;
		if (from.charCodeAt(0) < 97 && to.charCodeAt(0) > 122)
		{
			alert("Please input a valid lower case letter for range");
			return;
		}

		var range_arr = [];
		for (var i=from.charCodeAt(0); i<=to.charCodeAt(0); i++)
			range_arr.push(String.fromCharCode(i));

		if (document.getElementById("caps").checked)
		{
			for (var i=from.charCodeAt(0); i<=to.charCodeAt(0); i++)
				range_arr.push(String.fromCharCode(i).toUpperCase());
		}

		if (document.getElementById("other_chars").value != "")
		{
			var temp_arr = document.getElementById("other_chars").value.split(",");
			for (var i=0; i<temp_arr.length; i++)
				range_arr.push(temp_arr[i]);
		}

		cmds_arr.push(new cmd("c", "c", range_arr));
	}
	else if (which == "com")
	{
		if (document.getElementById("init_cmd_text").value == "" || document.getElementById("other_cmds_text").value == "")
		{
			alert("Please input a valid entry for initializing command");
			return;
		}

		var other_arr = document.getElementById("other_cmds_text").value.split(" ");
		for (var a=0; a<(1 + other_arr.length); a++)
		{
			var arr;
			var temp;
			var range_arr = [];

			if (a == 0)
			{
				arr = document.getElementById("init_cmd_text").value.split(":");
				temp = arr[1].split("-");
			}
			else
			{
				arr = other_arr[a-1].split(":");
				temp = arr[1].split("-");
			}


			if (temp.length == 1)
			{
				temp = arr[1].split(",");
				for (var i=0; i<temp.length; i++)
				{
					if (i == 0)
						range_arr.push(temp[i].substring(1,temp[i].length));
					else if (i == temp.length-1)
						range_arr.push(temp[i].substring(0,temp[i].length-1));
					else
						range_arr.push(temp[i]);
				}
			}
			else 
			{
				var from = Number(temp[0].substring(1, temp[0].length));
				var to = Number(temp[1].substring(0, temp[1].length-1));

				if (isNaN(from) || isNaN(to))
				{
					from = temp[0].substring(1, temp[0].length);
					to = temp[1].substring(0, temp[1].length-1);

					for (var i=from.charCodeAt(0); i<=to.charCodeAt(0); i++)
						range_arr.push(String.fromCharCode(i));
				}
				else
				{
					for (var i=from; i<=to; i++)
						range_arr.push(i);
				}		
			}


			if (a == 0)
				init_cmd = new cmd("\""+arr[0]+"\"", "\""+arr[0]+"\"", range_arr);
			else
				cmds_arr.push(new cmd("\""+arr[0]+"\"", "\""+arr[0]+"\"", range_arr));
		}
	}

	generate();
}