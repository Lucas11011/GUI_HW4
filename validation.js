// GUI Assignment 4
// Lucas Aurelio lucas_aurelio@student.uml.edu
// Copyright (c) 2024 by Lucas. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.


$(function() {
    // Custom validation method "lessOrEqual" that checks
    // if the value of the current input field is less than or equal to the value of another input field
    $.validator.addMethod("lessOrEqual", function(value, element, params) {
        // Parse the current input field's value as an integer
        var minValue = parseInt(value);
        // Parse the value of the specified input field as an integer
        var maxValue = parseInt($(params).val());
        // Return true if either value is not a number, or if minValue is greater than maxValue
        return isNaN(minValue) || isNaN(maxValue) || minValue <= maxValue;
    }, "Minimum value must be less than or equal to maximum value");

    // Initialize validation on the form with ID "tableForm"
    $("#tableForm").validate({
        // Validation rules for each input field
        rules: {
            minRow: {
                required: true,
                number: true,
                range: [-50, 50],
                lessOrEqual: "#maxRow"
            },
            maxRow: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            minCol: {
                required: true,
                number: true,
                range: [-50, 50],
                lessOrEqual: "#maxCol"
            },
            maxCol: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            minRow: {
                required: "Please enter a minimum row value",
                number: "Please enter a number between -50 and 50",
                range: "Value must be between -50 and 50",
                lessOrEqual: "Minimum row value cannot be greater than maximum row value"
            },
            maxRow: {
                required: "Please enter a maximum row value",
                number: "Please enter a number between -50 and 50",
                range: "Value must be between -50 and 50"
            },
            minCol: {
                required: "Please enter a minimum column value",
                number: "Please enter a number between -50 and 50",
                range: "Value must be between -50 and 50",
                lessOrEqual: "Minimum column value cannot be greater than maximum column value"
            },
            maxCol: {
                required: "Please enter a maximum column value",
                number: "Please enter a number between -50 and 50",
                range: "Value must be between -50 and 50"
            }
        },
        // Defining the error messages placement
        errorPlacement: function(error, element) {
            // After the input field
            error.insertAfter(element);
        },
        // Defining what happens when the form is valid and submitted
        submitHandler: function(form) {
            generateTable();
        }
    });
});

// Function to generate the multiplication table
function generateTable() {
    // Get values from the form, ensure they are integers
    var minRow = +$("#minRow").val();
    var maxRow = +$("#maxRow").val();
    var minCol = +$("#minCol").val();
    var maxCol = +$("#maxCol").val();

    // Clear any existing table
    $("#multiplicationTable").empty();

    // Create table element
    var $table = $("<table>");

    // Loop through rows and columns to create table cells
    for (var i = minRow - 1; i <= maxRow; i++) {
        // Create a new row
        var $tr = $("<tr>");

        for (var j = minCol - 1; j <= maxCol; j++) {
            // Create table header cells for the first row and first column
            if (i === minRow - 1 && j === minCol - 1) {
                $tr.append($("<th>"));
            }
            else if (i === minRow - 1) {
                $tr.append($("<th>").text(j));
            }
            else if (j === minCol - 1) {
                $tr.append($("<th>").text(i));
            } 
            else {
                // Create table data cells for the rest of the table
                $tr.append($("<td>").text(i * j));
            }
        }

        // Append the row to the table
        $table.append($tr);
    }

    // Append the generated table
    $("#multiplicationTable").append($table);
}