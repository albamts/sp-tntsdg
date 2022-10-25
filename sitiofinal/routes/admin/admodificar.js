var express = require('express');
var router = express.Router();
var apadraModelo = require('./../../modelos/apadraModelo');
var adoptaModelo = require('../../modelos/adoptaModelo');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



router.get('/', function (req, res, next) {
    res.render('admin/admodificar', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        mensaje: 'Será dirigido aquí para editar.'
    });
});


// ESTE VA SER PARA GUARDAR MASCOTAS
//---> PROBALO -->
router.post('/editarmascota', async (req, res, next) => {
    try {
        // aca maneja la posibilidad de modificaciones en foto
        let foto_i = req.body.m_imagen_orig;
        let borrar_foto_i_orig = false;
        if (req.body.m_imagen_borrar === '1') {
            foto_i = null;
            borrar_foto_i_orig = true;            
        } else {
            if (req.files && Object.keys(req.files).length > 0){
                imagen = req.files.m_imagen;
                foto_i = (await uploader(imagen.tempFilePath)).public_id;
                borrar_foto_i_orig = true;
            }
        }
        if (borrar_foto_i_orig && req.body.m_imagen_orig) {
            await (destroy(req.body.m_imagen_orig));
            
        }
        // var foto_i = '';
        var cual = req.body.m_i_mas;
        var bchicos = Boolean(req.body.m_chicos);
        var banimales = Boolean(req.body.m_animales);
        var editadoM = {
            nombre: req.body.m_nombre,
            especie: req.body.m_especie,
            edad: req.body.m_edad,
            descripcion: req.body.m_descripcion,
            chicos: bchicos,
            animales: banimales,
            salud: req.body.m_salud,
            foto_i,
            adoptado: '0'
        }
        await adoptaModelo.modificarAdoptable(editadoM, cual);
        res.render('admin/admodificar', {
            mensaje: 'Editado exitosamente.'
        });
        
      } catch (error) {
        console.log(error);
        res.render('admin/admodificar', {
          error: true, message: 'Ha ocurrido un error. Podrian no haberse guardado los cambios.'
        }); 
      }
});

//ESTE VA A SER PARA GUARDAR APADRINADOS
//---> PROBALO -->
router.post('/editarpadrinado', async (req, res, next) => {
    try {
        // aca maneja la posibilidad de modificaciones en foto
        let foto_i = req.body.s_imagen_orig;
        let borrar_foto_i_orig = false;
        if (req.body.s_imagen_borrar === '1') {
            foto_i = null;
            borrar_foto_i_orig = true;            
        } else {
            if (req.files && Object.keys(req.files).length > 0){
                imagen = req.files.s_imagen;
                foto_i = (await uploader(imagen.tempFilePath)).public_id;
                borrar_foto_i_orig = true;
            }
        }
        if (borrar_foto_i_orig && req.body.s_imagen_orig) {
            await (destroy(req.body.s_imagen_orig));
            
        }
        var cual = req.body.s_i_ser;
        var editadoS = {
            nombre: req.body.s_nombre,
            especie: req.body.s_especie,
            adicion: req.body.s_adicion,
            foto_i
        }
        await apadraModelo.modificarPadrinable(editadoS, cual);
        res.render('admin/admodificar', {
            mensaje: 'Editado exitosamente.'
        }); 
      } catch (error) {
        console.log(error);
        res.render('admin/admodificar', {
          error: true, message: 'Ha ocurrido un error. Podrian no haberse guardado los cambios.'
        }); 
      }
});

//ESTE VA A SER PARA EDITAR FAMILIAS
//---> PROBALO -->
router.post('/editarfamilia', async (req, res, next) => {
    try {
        var cual = req.body.f_i_fam;
        var editadoF = {
            nombre: req.body.f_nombre,
            apellido: req.body.f_apellido,
            direccion: req.body.f_direccion,
            celular: req.body.f_celular,
            celular_alternativo: req.body.f_celular_alternativo
        }
        await adoptaModelo.modificarFamilia(editadoF, cual);
        res.render('admin/admodificar', {
            layout: 'admin/layout',
            nombre: req.session.nombre,
            mensaje: 'Editado exitosamente.'
        });
    } catch (error) {
        console.log(error);
        res.render('admin/admodificar', {
            error: true, message: 'Ha ocurrido un error. Podrian no haberse guardado los cambios.'
        });
    }
});

module.exports = router;