$(document).ready(function(){
  $('#mySelect').change(function(){
      if($(this).val() == 'all'){
          $(this).find('option').prop('selected', true);
      }
  });
});