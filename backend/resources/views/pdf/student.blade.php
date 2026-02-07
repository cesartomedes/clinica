<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 12px;
            color: #1f2937;
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
            color: #1e40af;
        }

        .section-title {
            margin-top: 25px;
            font-size: 15px;
            color: #1e40af;
            border-left: 5px solid #3b82f6;
            padding-left: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th, td {
            border: 1px solid #cbd5e1;
            padding: 7px;
            font-size: 11.5px;
        }

        th {
            background-color: #eff6ff;
            color: #1e3a8a;
            width: 35%;
            text-align: left;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #cbd5e1;
            padding-top: 10px;
        }
    </style>
</head>
<body>

<div class="header">
    <h1>Reporte Integral del Estudiante</h1>
</div>

<h3 class="section-title">Datos del Alumno</h3>
<table>
    <tr><th>Nombre</th><td>{{ $student->name }}</td></tr>
    <tr><th>Sexo</th><td>{{ $student->sexo }}</td></tr>
    <tr><th>Edad</th><td>{{ $student->edad }}</td></tr>
    <tr><th>Fecha de Nacimiento</th><td>{{ $student->fecha_nacimiento }}</td></tr>
    <tr><th>Grado</th><td>{{ $student->grado }}</td></tr>
    <tr><th>Sección</th><td>{{ $student->section_name }}</td></tr>
    <tr><th>Cédula Escolar</th><td>{{ $student->cedula_escolar }}</td></tr>
</table>

<h3 class="section-title">Datos Académicos</h3>
<table>
    <tr><th>Matrícula V</th><td>{{ $student->matricula_v }}</td></tr>
    <tr><th>Matrícula H</th><td>{{ $student->matricula_h }}</td></tr>
    <tr><th>Matrícula Total</th><td>{{ $student->matricula_total }}</td></tr>
    <tr><th>Docente</th><td>{{ $student->docente }}</td></tr>
</table>

@if($student->representative)
<h3 class="section-title">Representante</h3>
<table>
    <tr><th>Nombre</th><td>{{ $student->representative->nombre }}</td></tr>
    <tr><th>Cédula</th><td>{{ $student->representative->cedula }}</td></tr>
    <tr><th>Teléfono</th><td>{{ $student->representative->telefono }}</td></tr>
    <tr><th>Dirección</th><td>{{ $student->representative->direccion }}</td></tr>
</table>
@endif

@if($student->medicalRecord)
<h3 class="section-title">Ficha Médica</h3>
<table>
    <tr><th>Peso</th><td>{{ $student->peso }} kg</td></tr>
    <tr><th>Talla</th><td>{{ $student->talla }} cm</td></tr>
    <tr><th>Circunferencia Braquial</th><td>{{ $student->circunferencia_braquial }} cm</td></tr>
    <tr><th>Salud Bucal</th><td>{{ $student->medicalRecord->bucal ?? 'No especificado' }}</td></tr>
    <tr><th>Caries</th><td>{{ $student->medicalRecord->caries ? 'Sí' : 'No' }}</td></tr>
    <tr><th>Dificultad Visual</th><td>{{ $student->medicalRecord->dif_visual ? 'Sí' : 'No' }}</td></tr>
    <tr><th>Vacunado</th><td>{{ $student->medicalRecord->vacunado ? 'Sí' : 'No' }}</td></tr>
    <tr><th>Dosis</th><td>{{ $student->medicalRecord->dosis ?? 'No especificado' }}</td></tr>
    <tr><th>Desparasitado</th><td>{{ $student->medicalRecord->desparasitado ? 'Sí' : 'No' }}</td></tr>
    <tr><th>Observaciones</th><td>{{ $student->medicalRecord->observaciones ?? 'Ninguna' }}</td></tr>
</table>
@endif

<div class="footer">
    Documento generado automáticamente por el sistema • {{ now()->format('d/m/Y') }}
</div>

</body>
</html>
