$('.nav-item').on('click', function() {
        var type = $(this).data('type').trim();

        // Show all rows if no type is selected
        if (type === 'all') {
            $('#vehicle-table tbody tr').show();
        } else {
            // Hide rows that don't match the selected type
            $('#vehicle-table tbody tr').hide();
            $('#vehicle-table tbody tr').each(function() {
                var rowType = $(this).find('td:nth-child(7)').text().trim();
                console.log(rowType);
                console.log(type);
                if (rowType === type) {
                    $(this).show();
                }
            });
        }
});
