import {pool} from '../db.js'

export const getEmpleados = async (req, res) => {
    try {
        const [rows] =  await pool.query('SELECT * FROM EMPLEADOS')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar consultar en la base de datos"
        })
    }
  
}

export const getUnEmpleado = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM empleados WHERE ID = ?', [req.params.ID])

        if(rows.length <= 0) return res.status(404).json({
            message: "empleado no encontrado"
        })
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar consultar en la base de datos"
        })     
    }   
}

export const createEmpleados = async(req, res) => {
    const {id, nombre, cargo, usuario, password} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO empleados (ID, NOMBRE, CARGO, USUARIO, password) VALUES(?, ?, ?, ?, ?)', [id, nombre, cargo, usuario, password] )
        res.send({ rows })
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar consultar en la base de datos"
        })
    }
    
};

export const deleteEmpleados = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM empleados WHERE ID = ?', [req.params.ID])

        if (result.affectedRows <= 0) return res.status(404).json({
            message:"Empleado no encontrado"
        })

        res.sendStatus(204)        
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar eliminar de la base de datos"
        })
    }
};

export const updateEmpleado = async(req, res) => {
    const {ID} = req.params
    const {nombre, cargo, usuario, password} =req.body
    
    try {   
        const [result] = await pool.query('UPDATE empleados SET NOMBRE = IFNULL(?, NOMBRE), CARGO = IFNULL(?, CARGO), USUARIO = IFNULL(?, USUARIO), password = IFNULL(?, password) WHERE ID = ?', [nombre, cargo, usuario, password, ID] )

        if(result.affectedRows === 0) return res.status(404).json({
            message: "Empleado no encontrado"
        })

        const [rows] =  await pool.query('SELECT * FROM empleados WHERE ID = ?', [ID])
        res.json(rows[0])                 
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar mostrar los datos de la base de datos"
        })
    }
     
};

