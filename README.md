# Open SDG Tables

This is a light-weight and opinionated wrapper around jQuery Datatables which includes some accessibility improvements that have been requested in Open SDG projects.

## Requirements

This script assumes that jQuery, jQuery Datatables, and Fontawesome have all been loaded first. One way to do this is to add the following before this script is run:

```
<script defer src="https://use.fontawesome.com/releases/v5.15.1/js/all.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
```

Note if you want to use any special features of jQuery Datables beyond sorting then you may need to load the jQuery Datatables CSS file. Otherwise it is not necessarily required.

## Usage

### 1. Table HTML

First have the HTML for your table on page. As a best practice it should contain all data, but technically it only needs to be a blank `<table>` element with a particular id. For example:

```
<table id="my-table"></table>
```

### 2. Table rows

Next get the rows of your tables as an array of objects. For example:

```
var tableRows = [
    { Year: 2010, Value: 10 },
    { Year: 2011, Value: 11 },
]
```

If you happen to be getting this data from a Pandas dataframe in Python, the code to convert your dataframe "df" into JSON would be:

```
df.to_json(orient='records')
```

### 3. Optionally override the options.

You can optionally pass in an object to override the default options. The default options are:

```
{
    // A caption for the table.
    caption: '',
    // A message for screenreaders about the column sorting.
    columnSortInfo: 'Click to sort by this column',
    // Any overrides of the jQuery Datatables configuration.
    datatableConfig: {
        lengthChange: false,
        paging: false,
        bInfo: false,
        bAutoWidth: false,
        searching: false,
        responsive: false,
        order: [[0, 'asc']],
        aaSorting: [],
    }
}
```

For example, if you want to override the caption:

```
var options = {
    caption: 'My table caption',
};
```

### 4. Use jQuery to call the openSdgTable function on a particular table.

For example, given all the examples in the steps above:

```
$('#my-table').openSdgTable(tableRows, options);
```
