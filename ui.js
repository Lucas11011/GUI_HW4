// GUI Assignment 4
// Lucas Aurelio lucas_aurelio@student.uml.edu
// Copyright (c) 2024 by Lucas. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.


$(function() {
    // Initialize sliders using jQuery UI Slider plugin
    $("#minRowSlider, #maxRowSlider, #minColSlider, #maxColSlider").slider({
        // Set the range and minimum and maximum values for the sliders
        range: "min",
        min: -50,
        max: 50,
        // Event handler for when the slider is being moved
        slide: function(event, ui) {
            // Get the ID of the slider that is being moved
            var sliderId = $(this).attr("id");
            // Get the corresponding input field's ID by removing "Slider" from the slider ID
            var InputId = sliderId.replace("Slider", "");
            // Set the value of the corresponding input field to the current value of the slider
            $("#" + InputId).val(ui.value);
            // Trigger the change event for the input field to sync it with the slider
            $("#" + InputId).trigger("change");
        }
    });

    // Sync sliders with text inputs
    $("#minRow, #maxRow, #minCol, #maxCol").on("input change", function() {
        // Get the ID of the input field that triggered the event
        var inputId = $(this).attr("id");
        // Get the corresponding slider's ID by adding "Slider" to the input ID
        var sliderId = inputId + "Slider";
        // Set the value of the corresponding slider to the current value of the input field
        $("#" + sliderId).slider("value", $(this).val());
    });



    // Initialize tabs using jQuery UI Tabs plugin
    $("#tabs").tabs();

    // Function to generate multiplication table and create a new tab
    function generateTable() {
        // Get values from the form
        var minRow = +$("#minRow").val();
        var maxRow = +$("#maxRow").val();
        var minCol = +$("#minCol").val();
        var maxCol = +$("#maxCol").val();

        // Clear any existing table
        $("#multiplicationTable").empty();

        // Generate the table
        var table = $("<table>");
        for (var i = minRow - 1; i <= maxRow; i++) {
            var tr = $("<tr>");
            for (var j = minCol - 1; j <= maxCol; j++) {
                if (i === minRow - 1 && j === minCol - 1) {
                    // Create an empty header cell, top-left corner
                    tr.append($("<th>"));
                }
                else if (i === minRow - 1) {
                    // Create header cells for the top row
                    tr.append($("<th>").text(j));
                }
                else if (j === minCol - 1) {
                    // Create header cells for the first column
                    tr.append($("<th>").text(i));
                }
                else {
                    // Create data cells for the rest of the table
                    tr.append($("<td>").text(i * j));
                }
            }
            // Add the data
            table.append(tr);
        }

        $("#multiplicationTable").append(table);

        // Tab label, the 4 input numbers comma separated
        var tabLabel = minRow + "," + maxRow + "," + minCol + "," + maxCol;
        // Add new tab with table
        var tabCount = $("#tabs ul li").length;
        var newTabId = "tab-" + tabCount;

        // Append a new tab list item and tab content
        $("#tabs ul").append('<li><input type="checkbox" name="tabsToDelete" value="' + newTabId + '"><a href="#' + newTabId + '">'
            + tabLabel + '</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>');
        $("#tabs").append('<div id="' + newTabId + '"><div class="scrollable">' + table.prop('outerHTML') + '</div></div>');
        $("#tabs").tabs("refresh");

        // Make tabs closable using jQuery UI Tabs plugin
        $("#tabs").delegate("span.ui-icon-close", "click", function() {
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            $("#tabs").tabs("refresh");
        });
    }

    // Delete selected tabs section
    $("#deleteSelectedTabs").click(function() {
        // Iterate through each checked checkbox and remove the checked tab
        $("input[name='tabsToDelete']:checked").each(function() {
            var panelId = $(this).val();
            $(this).closest("li").remove();
            $("#" + panelId).remove();
        });
        $("#tabs").tabs("refresh");
    });

    // Call generateTable when form is valid and submitted
    $("#tableForm").on("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Check if the form is valid
        if ($(this).valid()) {
            // Generate the table
            generateTable();
        }
    });
});
