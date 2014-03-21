window.Tasky = {};
Tasky.Tasks = {};

Tasky.Index = function() {
  setTimeout(function() {
    $('.main-title').addClass('in');
  }, 500);

  setTimeout(function() {
    $('.button').addClass('in');
    setTimeout(function() {
      $('.button').removeClass('fade slow')
    }, 800);
  }, 1500);
}

function getId(target) {
  return $(target).parents('.task').data('task');
};

function taskHtml(task) {
  return '<li class="task grow transition-all slide" data-task="' + task._id + '">' +
    '<div class="task-action"></div>' +
    '<h5 class="no-margin red task-title">' + task.title + '</h5>' +
    '<input type="text" maxlength="70" name="title" value="' + task.title + '">' +
    '<textarea maxlength="270">' + task.body + '</textarea>' +
    '<button class="update-task background-less full-width">' + 'Update Task' + '</button>' +
    '<div class="task-description">' + task.body + '</div>' +
    '<div class="task-actions">' +
      '<i class="fui-new edit-task"></i>' +
      '<i class="fui-cross delete-task"></i>' +
    '</div>' +
  '</li>';
};

Tasky.Tasks.Index = function() {
  var $createTask, that;
  var that = this;
  $('.task-action').each(this.bindTaskAction);
  $('.edit-task').each(this.bindEditTask);
  $('.delete-task').each(this.bindDeleteTask);
  $('.task').find('.update-task').each(this.updateTask);
  if (!$('.task').length > 0) {
    $('.no-tasks').addClass('in');
  }

  $createTask = $('.create-task');
  $createTask.find('.add-task').click(function() {
    $createTask.find('input, textarea').addClass('in');
    $createTask.addClass('in');
    setTimeout(function() {
      $createTask.find('button').addClass('in');
    }, 500);
  });

  $createTask.find('.cancel-task-button').click(function() {
    $createTask.removeClass('in');
    $createTask.find('input, textarea, button').removeClass('in');
    setTimeout(function() {
      $createTask.find('input, textarea').val('');
    }, 1000);
  });

  $createTask.find('.create-task-button').click(function() {

    var title = $createTask.find('input[type="text"]').val();
    var description = $createTask.find('textarea').val();

    $.ajax('/tasks', {
      type: 'POST',
      data: {
        title: title,
        body: description
      },
      success: function(data) {
        $('.no-tasks').removeClass('in');
        $('.create-task').after(taskHtml(data));
        setTimeout(function() {
          $('.task').first().addClass('in');
        });
        $('.delete-task').each(that.bindDeleteTask);
        $('.task').find('input[type="submit"]').each(that.updateTask);
        $('.task-action').each(that.bindTaskAction);
        $('.edit-task').each(that.bindEditTask);
        $('.task').find('.update-task').each(that.updateTask);
        $createTask.find('input[type="text"]').removeClass('in')
        $createTask.find('textarea').removeClass('in');
        $createTask.find('button').removeClass('in');
        $createTask.removeClass('in');

        setTimeout(function() {
          $createTask.find('input, textarea').val('');
        }, 1000);
      },
      error: function(xhr) {
        var serverErrors = xhr.responseJSON.errors;
        var errors = Object.keys(serverErrors).map(function(error) {
          return serverErrors[error].message;
        });

        console.log(errors.join('<br>'));
      }
    });
  });
};

Tasky.Tasks.Index.prototype.bindDeleteTask = function() {
  var $this, id, $task;

  $this = $(this);
  $task = $this.parents('.task');
  id = getId($this);

  $this.click(function() {
    $.ajax('/tasks/' + id, {
      type: 'DELETE',
      success: function() {
        $task.removeClass('in');
        setTimeout(function() {
          $task.remove();
          if (!$('.task').length > 0) {
            $('.no-tasks').addClass('in');
          }
        }, 500);
      }
    });
  });
}

Tasky.Tasks.Index.prototype.bindTaskAction = function() {
  var $this, id, alreadyFinished, action;

  $this = $(this);
  id = getId($this);

  $this.click(function() {
    alreadyFinished = $this.hasClass('finished');
    action = alreadyFinished ? '/tasks/' + id + '/unfinish' : '/tasks/' + id + '/finish'
    $.ajax(action, {
      type: 'PUT',
      success: function() {
        if (alreadyFinished) {
          $this.removeClass('finished');
        } else {
          $this.addClass('finished');
        }
      }
    });
  });
};

Tasky.Tasks.Index.prototype.updateTask = function() {
  var $this, id, $task, $taskTitle, $taskDescription, $input, $textarea, newTitle, newDescription;

  $this = $(this);
  $task = $this.parents('.task');
  $taskTitle = $task.find('.task-title');
  $taskDescription = $task.find('.task-description');
  $input = $task.find('input');
  $textarea = $task.find('textarea');

  id = getId($this);

  $this.click(function() {
    newTitle = $input.val();
    newDescription = $textarea.val();

    $.ajax('/tasks/' + id, {
      data: {
        title: newTitle,
        body: newDescription
      },
      type: 'PUT',
      success: function() {
        $taskTitle.text(newTitle);
        $taskDescription.text(newDescription);
        $task.removeClass('edit-mode');
        setTimeout(function() {
          $task.addClass('transition-all slide')
        }, 500);
      }
    });
  });
}

Tasky.Tasks.Index.prototype.bindEditTask = function() {
  var $this, $task;

  $this = $(this);
  $task = $this.parents('.task');

  $this.click(function() {
    $task.removeClass('transition-all slide')
    $task.addClass('edit-mode');
  });
}