
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
        $.extend(true, options, optionOverrides);

        var that = this;

        function getColumn(title) {
            var button = '<span tabindex="0" role="button" aria-describedby="column-sort-info">' + title + '</span>';
            var arrows = '<span class="sort"><i class="fa fa-sort"></i><i class="fa fa-sort-down"></i><i class="fa fa-sort-up"></i></span>';
            return {
                title: button + arrows,
                data: title,
            };
        }

        function cleanHeaders() {
            that.find('thead th')
                .removeAttr('rowspan')
                .removeAttr('colspan')
                .removeAttr('aria-label');
        }

        function cleanTable() {
            that.removeAttr('role');
        }

        function initializeHeaders(thead) {
            $(thead).find('th')
                .removeAttr('tabindex')
                .click(function() {
                    var sortDirection = $(this).attr('aria-sort');
                    $(this).find('span[role="button"]').attr('aria-sort', sortDirection);
                    // Clean headers again because of what jQuery Datatables does.
                    cleanHeaders();
                });
        }

        $('<span id="column-sort-info" style="display:none"></span>')
            .appendTo('body')
            .text(options.columnSortInfo);

        options.datatableConfig.data = tableRows;
        options.datatableConfig.columns = Object.keys(tableRows[0]).map(getColumn);
        options.datatableConfig.headerCallback = initializeHeaders;

        // Create the datatable.
        this.html('')
            .addClass('open-sdg-table')
            .append('<caption>' + options.caption + '</caption>')
            .DataTable(options.datatableConfig);

        // Fix some problems that jQuery Datatables causes.
        cleanTable();
        cleanHeaders();

        return this;
    };

}(jQuery));
