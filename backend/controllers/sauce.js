// Requires
const Sauce = require('../models/sauce');
const fs = require('fs');

// Add sauce
exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce. mainPepper,
      heat: req.body.sauce.heat,
      likes:0,
      dislikes:0,
      usersLiked:req.body.sauce.usersLiked,
      usersDisliked:req.body.sauce.usersDisliked,
    });
    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'New sauce saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      } 
    );
  };

  // Get all sauces
  exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


  // Get one sauce
  exports.getOneSauce =  (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce. mainPepper,
      heat: req.body.sauce.heat
      };
    } else {
      sauce = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body. mainPepper,
      heat: req.body.heat
      };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'sauce updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

// Update sauce
// exports.modifySauce = (req, res, next) => {
//  Sauce.findOne({ _id: req.params.id }).then(
//    (sauce) => {
//      if (!sauce) {
//        return res.status(404).json({
//          error: new Error('Object not found')
//        });
//      }
//      if (Sauce.userId !== req.auth.userId) {
//        return res.status(401).json({
//          error: new Error('Authorisation failed')
//        });
//      }
//      if(req.file) {
//        Sauce.findOne({ _id: req.params.id })
//            .then(newSauce => {
//                const last_filename = newSauce.imageUrl.split('/images/')[1];
//                fs.unlink('images/' + last_filename, () => {});
//            })
//            .catch(error => console.log('Removal failed'));
//    }
//    setTimeout(() => {
//        const sauceObject = req.file ? {
//        ...JSON.parse(req.body.sauce),
//        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//        } : { ...req.body };
//        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//           .then(() => res.status(200).json({ message: 'Sauce updated'}))
//            .catch(error => res.status(400).json({ error }));
//    }, 250);
// });
// };

// Delete sauce
exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      if (!sauce) {
        return res.status(404).json({
          error: new Error('Object not found')
        });
      }
      if (Sauce.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('Authorisation failed')
        });
      }
      Sauce.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  );
};

  // Rate sauce
  exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then((sauce) => {
      if (req.body.like == 1) {
          sauce.usersLiked.push(req.body.userId)
          sauce.likes += 1
      } else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
          sauce.usersLiked.remove(req.body.userId)
          sauce.likes -= 1
      } else if (req.body.like == -1) {
          sauce.usersDisliked.push(req.body.userId)
          sauce.dislikes += 1
      } else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
          sauce.usersDisliked.remove(req.body.userId)
          sauce.dislikes -= 1
      }
     
      sauce.save().then(
          () => {
              res.status(200).json({
                  message: "Sauce rated"
              });
          }
      ).catch(
          (error) => {
              res.status(400).json({
                  error: error
              });
          }
      );
  });

    
  };