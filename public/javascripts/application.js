window.Tasky = {};
Tasky.Tasks = {};

function getId(target) {
  return $(target).parents('.task').data('task');
}

Tasky.Tasks.Index = function() {
  $('.task-action').each(this.bindTaskAction);
  $('.edit-task').each(this.bindEditTask);
  $('.delete-task').each(this.bindDeleteTask);
  $('.task').find('input[type="submit"]').each(this.updateTask);
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
        description: newDescription
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