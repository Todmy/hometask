function jsonFormat() {
    console.log(JSON.stringify(arrElems.getElement()));
    $('[jq-app]').find('[jq-show]').html(JSON.stringify(arrElems.getElement())).toggleClass('invisible');
};