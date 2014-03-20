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
  return '<li class="task" data-task="' + task._id + '">' +
    '<div class="task-action"></div>' +
    '<h5 class="no-margin red task-title">' + task.title + '</h5>' +
    '<input class="hide" type="text" name="title" value="' + task.title + '">' +
    '<textarea class="hide">' + task.body + '</textarea>' +
    '<input class="hide" type="submit">' +
    '<div class="task-description">' + task.body + '</div>' +
    '<div class="task-actions">' +
      '<i class="fui-new edit-task">' +
      '<i class="fui-cross delete-task">' +
    '</div>' +
  '</li>';
};

Tasky.Tasks.Index = function() {
  var $createTask, that;
  var that = this;
  $('.task-action').each(this.bindTaskAction);
  $('.edit-task').each(this.bindEditTask);
  $('.delete-task').each(this.bindDeleteTask);
  $('.task').find('input[type="submit"]').each(this.updateTask);

  $createTask = $('.create-task');
  $createTask.find('input[type="submit"]').click(function() {

    var title = $createTask.find('input[type="text"]').val();
    var description = $createTask.find('textarea').val()

    $.ajax('/tasks', {
      type: 'POST',
      data: {
        title: title,
        body: description
      },
      success: function(data) {
        $('.create-task').before(taskHtml(data));
        $('.delete-task').each(that.bindDeleteTask);
        $('.task').find('input[type="submit"]').each(that.updateTask);
        $('.task-action').each(that.bindTaskAction);
        $('.edit-task').each(that.bindEditTask);
        $createTask.find('input[type="text"]').val('');
        $createTask.find('textarea').val('');
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
        $task.remove();
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
        $input.hide();
        $textarea.hide();
        $taskTitle.show();
        $taskDescription.show();
      }
    });
  });
}

Tasky.Tasks.Index.prototype.bindEditTask = function() {
  var $this, $task, $taskTitle, $taskDescription, $hidden, $submit;

  $this = $(this);
  $task = $this.parents('.task');
  $taskTitle = $task.find('.task-title');
  $taskDescription = $task.find('.task-description');
  $hidden = $task.find('.hide');

  $this.click(function() {
    $taskTitle.hide();
    $taskDescription.hide();
    $hidden.show();
  });
}