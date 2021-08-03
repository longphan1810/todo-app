const express = require('express');
 
function createRouter(db) {
  const router = express.Router();
  const owner = '';
 
  // the routes are defined here
  router.post('/', (req, res, next) => {
    db.query(
      'INSERT INTO task (taskName, taskDes) VALUES (?,?)',
      [req.body.taskName, req.body.taskDes],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          db.query(`SELECT * FROM task ORDER BY id DESC LIMIT 1`,
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json(results);
            }
          })
        }
      }
    );
  });

  router.get('/', function (req, res, next) {
    db.query(
      `SELECT * FROM task ORDER BY id DESC`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.delete('/:id', function (req, res, next) {
    db.query(
      `DELETE FROM task WHERE id=?`,
      Number.parseInt([req.params.id]),
      (error) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.put('/', function (req, res, next) {
    db.query(
      `UPDATE task SET taskName=?, taskDes=?  WHERE id=${req.body.task.id}`, [req.body.nextTask.taskName.toString(), req.body.nextTask.taskDes.toString()],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          db.query(`UPDATE task SET taskName=?, taskDes=?  WHERE id=${req.body.nextTask.id}`, [req.body.task.taskName.toString(), req.body.task.taskDes.toString()],
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
              res.status(200).json(results);
            }
          })
        }
      }
    );
  });
  
  return router;
}
 
module.exports = createRouter;