$('#addPost_').on('submit',function (e) { 
    e.preventDefault()
    $('.error').remove();
    $('.success').remove();
    let form = new FormData()
    form.append('title',document.getElementById('title').value);
    form.append('post_content',document.getElementById('post_content').value);
    $('#addPost_').append('<div class="loader_back"><div class="loader"></div></div>');
    axios({
        method: 'post',
        url: 'http://localhost:3000/addpost',
        data: form
    }).then((resp) => { 
        $('.loader_back').remove();
        if (resp.data.status == true) {
            $('.error').remove();
            $('input').val('');
            $('textarea').val('');
            $("#addPost_").append('<h4 style="color:green" class="success">Post successfully Add</h4>')
        }else{
            $('.error').remove();
            for (const key in resp.data.error) {
                if (resp.data.error.hasOwnProperty(key)) {
                    const element = resp.data.error[key];
                    $('#'+element.id).parent().append('<p class="error" style="color:red">'+element.msg+'</p>')
                }
            }
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

$('.del_post').on('click',function (e) { 
    e.preventDefault();
    $id = $(this).attr('data-id');
    $('#post_list').append('<div class="loader_back"><div class="loader"></div></div>');
    axios({
        method: 'get',
        url: 'http://localhost:3000/delPost',
        params: {
            id: $id
        }
    }).then((resp) => {
        $('.loader_back').remove();
        if (resp.data.status == true) {
            $('#post_'+$id).remove();
        }
    }).catch((err) => {
        console.log(err);
    });
 })
 $('.status').on('click',function (e) { 
     e.preventDefault();
    $this = $(this);
     $id = $(this).attr('data-id');
     $status = $(this).attr('data-status');
     axios({
        method: 'get',
        url: 'http://localhost:3000/statusChange',
        params: {
            id: $id,
            status: $status
        }
     }).then((resp) => {
         if (resp.data.status == true) {
            $('#en_'+$id).prop('disabled', !$('#en_'+$id).prop('disabled'));
            $('#dis_'+$id).prop('disabled', !$('#dis_'+$id).prop('disabled'));
         }
     }).catch((err) => {
         console.log(err);
     });
  })



  $('.del_user').on('click',function (e) { 
      e.preventDefault();
      $id = $(this).attr('data-id');
        $('#user_list').append('<div class="loader_back"><div class="loader"></div></div>');
        axios({
            method: 'get',
            url: 'http://localhost:3000/deluser',
            params: {
                id: $id
            }
        }).then((resp) => {
            $('.loader_back').remove();
            if (resp.data.status == true) {
                $('#user_'+$id).remove();
            }
        }).catch((err) => {
            console.log(err);
        });
   })

   $('.status_user').on('click',function (e) { 
       e.preventDefault();
       e.preventDefault();
       $this = $(this);
        $id = $(this).attr('data-id');
        $status = $(this).attr('data-status');
        axios({
           method: 'get',
           url: 'http://localhost:3000/user_statusChange',
           params: {
               id: $id,
               status: $status
           }
        }).then((resp) => {
            if (resp.data.status == true) {
               $('#en_'+$id).prop('disabled', !$('#en_'+$id).prop('disabled'));
               $('#dis_'+$id).prop('disabled', !$('#dis_'+$id).prop('disabled'));
            }
        }).catch((err) => {
            console.log(err);
        });
    })
