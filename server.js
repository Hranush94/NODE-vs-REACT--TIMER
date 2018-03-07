var dateFormat = require('dateformat');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var app = express();
var wget = require('node-wget');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3020;
var router = express.Router();
mongoose.connect('mongodb://localhost:27017/tasks');
app.use(cors());
app.use('/', router);
app.listen(port);
console.log("server is listening on port " + port);
var Schema = mongoose.Schema;
var taskSchema = new Schema({
  
  taskName: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  startTime: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  interval: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  
});
var Task = mongoose.model('Task', taskSchema);

app.get('/api', function (req, res, next) {
  Task.find({}, (err, tasks) => {
    if (err) {
      res.send(err);
      next();
      
    }
    res.json(tasks);
    next();
    
  });
});

// //====POST NEW Task===//
app.post('/api/tasks', function (req, res, next) {
  
  let task = new Task();
  task.taskName = req.body.task;
  task.startTime = req.body.start;
  task.interval = req.body.interval;
  
  task.save(function (err) {
    if (err) {
      res.send(err);
      next();
      
    }
    res.json({message: 'task saved successfully'});
    timer(task);
    next();
  });
  
});

app.put('/api/tasks/:id', (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      res.send(err);
    }
    task.taskName = req.body.task;
    task.startTime = req.body.start;
    task.interval = req.body.interval;
    task.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Task info updated'});
      var jobList = schedule.scheduledJobs;
      jobList[task._id].cancel();
      timer(task);
      
    });
  });
  
});

app.delete('/api/:id', (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    if (task === null) {
      res.status(404).send("task not found");
      return;
    }
    var jobList = schedule.scheduledJobs;
    jobList[task._id].cancel();
    Task.remove({
      _id: req.params.id
    }, (err, task) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({message: 'Task was deleted'});
      
    });
  })
});


function timer(value) {
  var rule = new schedule.RecurrenceRule();
  var startTime = dateFormat(value.startTime, 'mm-dd-yyyy HH:MM:ss');
  var str = '*/' + value.interval + ' * * * * *';
  schedule.scheduleJob((value._id).toString(), {start: startTime, rule: str}, function () {
    wget({
      url: (value.taskName).toString(),
    }, function (error, response, body) {
      if (error) {
        console.log('--- error:');
        console.log(error);            // error encountered
      } else {
        console.log('--- headers:');
        ////// console.log(response.headers); // response headers
        console.log('--- body:');
        // console.log(body);             // content of package
      }
    })
  })
}


Task.find({}, (err, tasks) => {
  if (err) {
    tasks.send(err);
  }
  tasks.map(function (task) {
    timer(task);
  });
});
