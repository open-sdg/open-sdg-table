
(function ($) {

    $.fn.openSdgTable = function(tableRows, optionOverrides) {

        var options = {
            caption: '',
            columnSortInfo: 'Click to sort by this column',
            datatableConfig: {
                lengthChange: false,
                paging: false,
                bInfo: false,
                bAutoWidth: false,
                searching: false,
                responsive: false,
                order: [[0, 'asc']],
                aaSorting: [],
            },
        };
        $.extend(options, optionOverrides);

        var lastColumn = Object.keys(tableRows[0]).length - 1;
        function getColumn(title, index) {
            var button = '<span tabindex="0" role="button" aria-describedby="column-sort-info">' + title + '</span>';
            var arrows = '<span class="sort"><i class="fa fa-sort-down"></i><i class="fa fa-sort-up"></i></span>';
            return {
                title: button + arrows,
                data: title,
            };
        }
        function fixHeaders(thead) {
            $(thead).find('th')
                .removeAttr('tabindex')
                .click(function() {
                    var sortDirection = $(this).attr('aria-sort');
                    $(this).find('span[role="button"]').attr('aria-sort', sortDirection);
                });
        }

        $('<span id="column-sort-info" style="display:none"></span>')
            .appendTo('body')
            .text(options.columnSortInfo);

        options.datatableConfig.data = tableRows;
        options.datatableConfig.columns = Object.keys(tableRows[0]).map(getColumn);
        options.datatableConfig.headerCallback = fixHeaders;

        // Create the datatable.
        this.html('')
            .addClass('open-sdg-table')
            .append('<caption>' + options.caption + '</caption>')
            .DataTable(options.datatableConfig);

        // Fix some problems that jQuery Datatables causes.
        this.removeAttr('role')
            .find('thead th')
                .removeAttr('rowspan')
                .removeAttr('colspan')
                .removeAttr('aria-label');

        return this;
    };

}(jQuery));
