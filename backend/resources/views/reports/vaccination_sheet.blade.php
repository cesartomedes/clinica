<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Vacunación Escolar</title>
    <style>
        @page {
            margin: 20mm;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.2;
        }

        h1, h2, h3 {
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 5px;
        }

        h2 {
            text-align: center;
            font-size: 14px;
            margin-bottom: 15px;
        }

        .school-info, .teacher-info {
            margin-bottom: 10px;
        }

        .school-info span, .teacher-info span {
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            page-break-inside: auto;
        }

        table th, table td {
            border: 1px solid #444;
            padding: 5px;
            font-size: 11px;
            text-align: center;
        }

        table th {
            background-color: #f0f0f0;
        }

        table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .representative-table th, .representative-table td {
            font-size: 11px;
        }

        .section-title {
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 5px;
            text-decoration: underline;
        }

        .footer {
            margin-top: 20px;
            font-size: 11px;
        }
    </style>
</head>
<body>

    <h1>Salud va a la Escuela</h1>
    <h2>Año Escolar 2025/2026</h2>

    <div class="school-info">
        <p>Grado/Año: <span>__________</span> &nbsp;&nbsp; Sección: <span>__________</span></p>
        <p>Matrícula: V: <span>______</span> H: <span>______</span> Total: <span>______</span></p>
        <p>CSI Clínica del Perú</p>
    </div>

    <div class="section-title">Registro de Estudiantes</div>
    <table>
        <thead>
            <tr>
                <th>Nº</th>
                <th>Nombre y Apellido</th>
                <th>Sexo</th>
                <th>Edad</th>
                <th>F/N</th>
                <th>Peso</th>
                <th>Talla</th>
                <th>C. B</th>
                <th>Caries</th>
                <th>Dif. Visual</th>
                <th>Vac.</th>
                <th>Dosis</th>
                <th>Desp.</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $index => $student)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $student->name }}</td>
                <td>{{ $student->sexo }}</td>
                <td>{{ $student->edad }}</td>
                <td>{{ $student->fecha_nacimiento }}</td>
                <td>{{ $student->peso ?? '-' }}</td>
                <td>{{ $student->talla ?? '-' }}</td>
                <td>{{ $student->circunferencia_braquial ?? '-' }}</td>
                <td>{{ $student->medicalRecord->bucal_caries ? 'SI' : 'NO' }}</td>
                <td>{{ $student->medicalRecord->visual_difficulty ? 'SI' : 'NO' }}</td>
                <td>
                    @if($student->applications->count())
                        SI
                    @else
                        NO
                    @endif
                </td>
                <td>
                    @if($student->applications->count())
                        {{ $student->applications->sum('dose_number') }}
                    @else
                        -
                    @endif
                </td>
                <td>-</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="teacher-info">
        <p>Docente: ___________________________________________</p>
    </div>

    <div class="section-title">Datos del Representante</div>
    <table class="representative-table">
        <thead>
            <tr>
                <th>Nº</th>
                <th>Cédula Escolar</th>
                <th>Nombre del Representante</th>
                <th>N° de Cédula</th>
                <th>Teléfono</th>
                <th>Dirección</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $index => $student)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $student->id }}</td>
                <td>{{ $student->representative->name ?? '-' }}</td>
                <td>{{ $student->representative->cedula ?? '-' }}</td>
                <td>{{ $student->representative->telefono ?? '-' }}</td>
                <td>{{ $student->representative->direccion ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Generado automáticamente por el Sistema de Control de Vacunas Escolar</p>
    </div>

</body>
</html>
