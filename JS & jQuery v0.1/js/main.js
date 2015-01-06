
var tmpRepeatPointer = $('[jq-app]').find('[jq-repeat]').html();
$('[jq-app]').find('[jq-show]').addClass('invisible');
$('[jq-app]').jqRepeat();
$('[jq-app]').jqClick();
