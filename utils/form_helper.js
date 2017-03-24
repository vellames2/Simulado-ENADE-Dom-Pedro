var FormHelper = function(){};

/**
 * @param $form Form to serialize
 * @returns {{}} Returns all fields of form in json format
 */
FormHelper.getFormData = ($form) => {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        if(n["value"] != ""){
            indexed_array[n['name']] = new RegExp(n['value'], 'i');
        }

    });

    return indexed_array;
};

/**
 * Mount the orderBy json to filter the list
 * @param event Event called
 */
FormHelper.setOrderBy = (event) => {
    // Order By object
    var orderBy = {};

    // Get actual order field and mode
    const fieldName = $(event.currentTarget).attr("data-field");
    var orderMode = $(event.currentTarget).attr("data-order-mode");

    // Parse the order mode to int and multiply his for -1 to change the order mode
    orderMode = parseInt(orderMode) * -1;

    // Reset all other possible orders
    $("[data-field]").attr("data-order-mode", -1);

    // Put actual orderBy on field
    $(event.currentTarget).attr("data-order-mode", orderMode);

    // Mount the json orderBy now
    orderBy[fieldName] = orderMode;

    Session.set("orderByForm", orderBy);
};

export {FormHelper}