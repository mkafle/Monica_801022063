$('#post_file').on('change',function () { 
    $('#post_content').val('');
    if (this.files[0].type == 'text/plain') {
        let file = this.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (event)=>{
            $('.fileError').remove();
            $('#post_content').val('');
            $('#post_content').val(event.target.result);
        }
        fileReader.readAsText(file);
    }else{
        $(this).after('<p class="fileError" style="color:red">You can upload only .txt file</p>');
    }
 })