package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func initDB() {
	var err error
	dsn := "appuser:apppassword@tcp(127.0.0.1:3306)/clinicDB"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("Database connected successfully")
}

func main() {
	initDB()

	r := gin.Default()

	// Paciente routes
	r.GET("/patients", getPatients)
	r.POST("/patients", createPatient)
	r.GET("/patients/:rut", getPatient)
	r.PUT("/patients/:rut", updatePatient)
	r.DELETE("/patients/:rut", deletePatient)

	// Consulta routes
	r.GET("/consults", getConsults)
	r.POST("/consults", createConsult)
	r.GET("/consults/:codigo", getConsult)
	r.PUT("/consults/:codigo", updateConsult)
	r.DELETE("/consults/:codigo", deleteConsult)

	log.Println("Server is running on port 8080")
	r.Run(":8080")
}

// Paciente handlers
func getPatients(c *gin.Context) {
	rows, err := db.Query("SELECT rut, nombre, direccion, telefono FROM Paciente")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var patients []map[string]interface{}
	for rows.Next() {
		var rut, nombre, direccion string
		var telefono int
		if err := rows.Scan(&rut, &nombre, &direccion, &telefono); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		patients = append(patients, gin.H{"rut": rut, "nombre": nombre, "direccion": direccion, "telefono": telefono})
	}

	c.JSON(http.StatusOK, patients)
}

func createPatient(c *gin.Context) {
	var patient struct {
		Rut       string `json:"rut"`
		Nombre    string `json:"nombre"`
		Direccion string `json:"direccion"`
		Telefono  int    `json:"telefono"`
	}

	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("INSERT INTO Paciente (rut, nombre, direccion, telefono) VALUES (?, ?, ?, ?)",
		patient.Rut, patient.Nombre, patient.Direccion, patient.Telefono)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Patient created"})
}

func getPatient(c *gin.Context) {
	rut := c.Param("rut")

	var patient struct {
		Rut       string `json:"rut"`
		Nombre    string `json:"nombre"`
		Direccion string `json:"direccion"`
		Telefono  int    `json:"telefono"`
	}

	err := db.QueryRow("SELECT rut, nombre, direccion, telefono FROM Paciente WHERE rut = ?", rut).Scan(&patient.Rut, &patient.Nombre, &patient.Direccion, &patient.Telefono)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, patient)
}

func updatePatient(c *gin.Context) {
	rut := c.Param("rut")
	var patient struct {
		Nombre    string `json:"nombre"`
		Direccion string `json:"direccion"`
		Telefono  int    `json:"telefono"`
	}

	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("UPDATE Paciente SET nombre = ?, direccion = ?, telefono = ? WHERE rut = ?",
		patient.Nombre, patient.Direccion, patient.Telefono, rut)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Patient updated"})
}

func deletePatient(c *gin.Context) {
	rut := c.Param("rut")

	_, err := db.Exec("DELETE FROM Paciente WHERE rut = ?", rut)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Patient deleted"})
}

// Consulta handlers
func getConsults(c *gin.Context) {
	rows, err := db.Query("SELECT codigo, fechaConsulta, horaConsulta, medico_tratante, nro_clinica, rut FROM Consulta")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var consults []map[string]interface{}
	for rows.Next() {
		var codigo, nro_clinica int
		var fechaConsulta, horaConsulta, medico_tratante, rut string
		if err := rows.Scan(&codigo, &fechaConsulta, &horaConsulta, &medico_tratante, &nro_clinica, &rut); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		consults = append(consults, gin.H{"codigo": codigo, "fechaConsulta": fechaConsulta, "horaConsulta": horaConsulta, "medico_tratante": medico_tratante, "nro_clinica": nro_clinica, "rut": rut})
	}

	c.JSON(http.StatusOK, consults)
}

func createConsult(c *gin.Context) {
	var consult struct {
		FechaConsulta  string `json:"fechaConsulta"`
		HoraConsulta   string `json:"horaConsulta"`
		MedicoTratante string `json:"medico_tratante"`
		NroClinica     int    `json:"nro_clinica"`
		Rut            string `json:"rut"`
	}

	if err := c.ShouldBindJSON(&consult); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("INSERT INTO Consulta (fechaConsulta, horaConsulta, medico_tratante, nro_clinica, rut) VALUES (?, ?, ?, ?, ?)",
		consult.FechaConsulta, consult.HoraConsulta, consult.MedicoTratante, consult.NroClinica, consult.Rut)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Consult created"})
}

func getConsult(c *gin.Context) {
	codigo := c.Param("codigo")
	codigoInt, err := strconv.Atoi(codigo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid consult code"})
		return
	}

	var consult struct {
		Codigo         int    `json:"codigo"`
		FechaConsulta  string `json:"fechaConsulta"`
		HoraConsulta   string `json:"horaConsulta"`
		MedicoTratante string `json:"medico_tratante"`
		NroClinica     int    `json:"nro_clinica"`
		Rut            string `json:"rut"`
	}

	err = db.QueryRow("SELECT codigo, fechaConsulta, horaConsulta, medico_tratante, nro_clinica, rut FROM Consulta WHERE codigo = ?", codigoInt).Scan(&consult.Codigo, &consult.FechaConsulta, &consult.HoraConsulta, &consult.MedicoTratante, &consult.NroClinica, &consult.Rut)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Consult not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, consult)
}

func updateConsult(c *gin.Context) {
	codigo := c.Param("codigo")
	codigoInt, err := strconv.Atoi(codigo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid consult code"})
		return
	}

	var consult struct {
		FechaConsulta  string `json:"fechaConsulta"`
		HoraConsulta   string `json:"horaConsulta"`
		MedicoTratante string `json:"medico_tratante"`
		NroClinica     int    `json:"nro_clinica"`
		Rut            string `json:"rut"`
	}

	if err := c.ShouldBindJSON(&consult); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = db.Exec("UPDATE Consulta SET fechaConsulta = ?, horaConsulta = ?, medico_tratante = ?, nro_clinica = ?, rut = ? WHERE codigo = ?",
		consult.FechaConsulta, consult.HoraConsulta, consult.MedicoTratante, consult.NroClinica, consult.Rut, codigoInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Consult updated"})
}

func deleteConsult(c *gin.Context) {
	codigo := c.Param("codigo")
	codigoInt, err := strconv.Atoi(codigo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid consult code"})
		return
	}

	_, err = db.Exec("DELETE FROM Consulta WHERE codigo = ?", codigoInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Consult deleted"})
}
