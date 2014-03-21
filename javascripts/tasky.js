window.Tasky = (function() {
  var tasky, taskUI, task;
  tasky = {};
  task = {
    create: function(data, success, error) {
      $.ajax('/tasks', {
        type: 'POST',
        data: data,
        success: success,
        error: error
      });
    },

    delete: function(id, success, error) {
      $.ajax('/tasks/' + id, {
        type: 'DELETE',
        success: success,
        error: error
      });
    },

    update: function(id, data, success, error) {
      $.ajax('/tasks/' + id, {
        type: 'PUT',
        data: data,
        success: success,
        error: error
      });
    },

    finish: function(id, success, error) {
      $.ajax('/tasks/' + id + '/finish', {
        type: 'PUT',
        success: success,
        error: error
      });
    },

    unfinish: function(id, success, error) {
      $.ajax('/tasks/' + id + '/unfinish', {
        type: 'PUT',
        success: success,
        error: error
      });
    }
  }

  taskUI = {
    bindCreateTask: function() {
      var that = this;
      $createTask = $('.create-task');

      var clearFields = function() {
        setTimeout(function() { $createTask.find('input, textarea').val(''); }, 1000);
      };

      $('.add-task').click(function() { that.animateCreateTask('animateIn'); });
      $('.cancel-task-button').click(function() {
        that.animateCreateTask('animateOut');
        clearFields();
      });

      $('.create-task-button').click(function() {
          var title = $createTask.find('input[type="text"]').val();
          var description = $createTask.find('textarea').val();
          task.create({ title: title, body: description }, function(data) {
            that.animateCreateTask('animateOut');
            clearFields();
            $('.search').after(that.taskHTML(data));
            Animations.listen();
            $('.task').first().trigger('animateIn');
            that.checkTaskMessage();
          }, function(xhr) {
            var serverErrors = xhr.responseJSON.errors;
            var errors = Object.keys(serverErrors).map(function(error) {
              return serverErrors[error].message;
            });

            console.log(errors.join('<br>'));
          });
      });
    },

    bindTaskActions: function() {
      var that = this;
      $(document).on('click', '.delete-task', function() {
        var $this, id, $task;

        $this = $(this);
        $task = $this.parents('.task');
        id = that._taskId($this);

        task.delete(id, function() {
          $task.trigger('animateOut');
          setTimeout(function() {
            $task.remove();
            that.checkTaskMessage();
          }, 500);
        }, function(xhr) {
          console.log('Error');
          console.log(xhr);
        });
      });

      $(document).on('click', '.edit-task', function() {
        var $this, $task;

        $this = $(this);
        $task = $this.parents('.task');

        $task.removeClass('transition-all slide');
        $task.addClass('edit-mode');
      });

      $(document).on('click', '.update-task', function() {
        var $this, id, $task, $taskTitle, $taskDescription, $input, $textarea, newTitle, newDescription;

        $this = $(this);
        $task = $this.parents('.task');
        id = $task.data('task');
        $taskTitle = $task.find('.task-title');
        $taskDescription = $task.find('.task-description');
        $input = $task.find('input');
        $textarea = $task.find('textarea');

        newTitle = $input.val();
        newDescription = $textarea.val();

        task.update(id, { title: newTitle, body: newDescription }, function() {
          $taskTitle.text(newTitle);
          $taskDescription.text(newDescription);
          $task.removeClass('edit-mode');
          setTimeout(function() { $task.addClass('transition-all slide') }, 500);
        }, function(xhr) {
          console.log('error updating');
          console.log(xhr);
        });
      });

      $(document).on('click', '.task-action', function() {
        var $this, id, alreadyFinished, action;

        $this = $(this);
        id = that._taskId($this);

        alreadyFinished = $this.hasClass('finished');

        if (alreadyFinished) {
          task.unfinish(id, function() { $this.removeClass('finished'); });
        } else {
          task.finish(id, function() { $this.addClass('finished'); });
        }
      })
    },

    checkTaskMessage: function() {
      $noTasks = $('.no-tasks');
      taskLength = $('.task').length
      setTimeout(function() {
        if (taskLength > 0) {
          $noTasks.trigger('animateOut');
        } else {
          $noTasks.trigger('animateIn');
        }
      })
    },

    taskHTML: function(task) {
      options = '{ "onEvent": true }';
      return "<li class='task grow transition-all slide' data-animate='" + options + "' data-task='" + task._id + "'>" +
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
    },

    animateCreateTask: function(animation) {
      $createTask = $('.create-task');
      $createTask.find('[data-animate]').trigger(animation);
      $createTask.trigger(animation);
    },

    _taskId: function(target) {
      return $(target).parents('.task').data('task');
    }
  }

  tasky.Tasks = {
    Index: function() {
      taskUI.bindCreateTask();
      taskUI.bindTaskActions();
      taskUI.checkTaskMessage();
    }
  };

  return tasky;
})();