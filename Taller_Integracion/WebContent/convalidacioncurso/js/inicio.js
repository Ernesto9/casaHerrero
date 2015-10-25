$(document).ready(function () {
	  $('.mitooltip').tooltip();
	var comboAlumno = $("#comboAlumno").alumnoSelectize("dynamicOptionsAlumno");
    comboAlumno.enable();
    var comboUniversidad = $("#comboUniversidad").universidadSelectize();
    
    $(document).on("change", '#comboAlumno', function (event) {
        var codcli = $(this).val();
        if (codcli.length) {
        	
            $.ajax({
                url: "../convalidacion",
                data: {'f': 'obtenerDatosAlumno','codalu':codcli},
                dataType: 'json',
                method: 'POST',
                success: function (datos) {
                    console.log(JSON.stringify(datos));
                    $('#codigo').empty().append(datos.persona.id);
                    $('#apellidos').empty().append(datos.persona.apellidopaterno + ' '+datos.persona.apellidomaterno);
                    $('#nombres').empty().append(datos.persona.nombre);
                    $('#facultad').empty().append(datos.facultad.nombre);
                    $('#escuela').empty().append(datos.especialidad.nombre);
                }
            });
            comboUniversidad.enable(comboUniversidad.cargarUniversidades());
            
        }else{
                    console.log(JSON.stringify("datos"));
        }
    });

    $(document).on('click', '#agregarcurso', function() {
        var nuevoForm= "";
        nuevoForm+='<div  class="row">';
        nuevoForm+='<div class="col-md-3 col-xs-10 col-sm-3">';
        nuevoForm+='<input type="text" class="codigocurso form-control" placeholder="Codigo de Curso" />';
        nuevoForm+='</div>';
        nuevoForm+='<div class="col-md-4 col-xs-12 col-sm-4">';
        nuevoForm+='<input type="text" class="nombrecurso form-control" placeholder="Nombre de Curso" />';
        nuevoForm+='</div>';
        nuevoForm+='<div class="col-md-2 col-xs-3 col-sm-2">';
        nuevoForm+='<input type="text" class="notacurso form-control" placeholder="Nota" />';
        nuevoForm+='</div>';
        nuevoForm+='<div class="col-md-1 col-xs-1 col-sm-1">';
        nuevoForm+='<button type="button" class="borrar btn btn-danger mitooltip"  data-placement="bottom" title="ELIMINAR CURSO">x</button>';
        nuevoForm+='</div>';
        nuevoForm+='<hr style="visibility: hidden">';
        nuevoForm+='</div>';
        $('.mitooltip').tooltip();
        $('#cursosaprobados').append(nuevoForm);
        });

    $(document).on('click', '.borrar', function() {
        //$(this).parent().prev().children("input").remove();
        $(this).parent().parent().remove();
    });
    
    $(document).on("submit", '#form', function(event) {
    	event.preventDefault();
    	var convalidacionalumno=[];
    	$("#cursosaprobados div").each(function(){
    		convalidacionalumno.push({
    			'cursoorigencodigo':$(this).find('.codigocurso').val(),
    			'cursoorigennombre':$(this).find('.nombrecurso').val(),
    			'alumno.persona.id':comboAlumno.getValue(),
    			'nota':$(this).find('.notacurso').val(),
    			'universidadorigen.id':comboUniversidad.getValue()
    		});
    		
    	});
    	var ajaxdata={'f':'registroCursos','convalidaciones':JSON.stringify(convalidacionalumno)};
    	$.ajax({
			url : "../registrodatos",
			data : ajaxdata,
			dataType : 'json',
			type : 'POST',
			success : function(datos) {
				if (datos == "OK") {
					console.log(datos);
					 toastr["success"]("Registro Exitoso");
				} else {
					console.log(datos);
					toastr["warning"]("Error al Registrar");
				}
			}
		});
    	
    });
    
});


