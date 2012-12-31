$(document).ready(function(){
  var nisab = 85*parseInt($('#harga_emas').val());
  $('#nisab').val(nisab);

  change_to_formatmoney();

  $('.input_pribadi, #pribadi_hutang').change(function(){
      calculate_pribadi();
      calculate_simpanan();
      calculate_total_zakat();
  });

  $('.input_usaha').change(function(){
      calculate_zakat_usaha();
      calculate_total_zakat();
  });

  $('input').change(function(){
      var new_val = accounting.formatMoney($(this).val(), { symbol: "",  format: "%v" }); 
      $(this).val(new_val);
  });

});

function change_to_formatmoney(){
  $('input').each(function(){
      var new_val = accounting.formatMoney($(this).val(), { symbol: "",  format: "%v" }); 
      $(this).val(new_val);
  });
}

function calculate_pribadi(){
  var sum = 0;
  $('.input_pribadi').each(function(){
      sum+=parseInt(accounting.unformat($(this).val()));   
  });
  $('#pribadi_jumlah').val(accounting.formatMoney(sum, { symbol: "",  format: "%v" }));
}

function calculate_simpanan(){
  var hutang = parseInt(accounting.unformat($('#pribadi_hutang').val()));
  var total_simpanan = parseInt(accounting.unformat($('#pribadi_jumlah').val()));
  var nisab = parseInt(accounting.unformat($('#nisab').val()));
  var sisa_simpanan = total_simpanan-hutang
  if(sisa_simpanan >= nisab){
    var pribadi_harta_zakat = sisa_simpanan;
  }else{
    var pribadi_harta_zakat = 0;
  }
  $('#pribadi_harta_zakat').val(accounting.formatMoney(pribadi_harta_zakat, { symbol: "",  format: "%v" }));
  var pribadi_zakat = 2.5/100*pribadi_harta_zakat;
  $('#pribadi_zakat').val(accounting.formatMoney(pribadi_zakat, { symbol: "",  format: "%v" }));
}

function calculate_zakat_usaha(){
    var perusahaan_nilai = parseInt(accounting.unformat($('#perusahaan_nilai').val()));
    var perusahaan_utang = parseInt(accounting.unformat($('#perusahaan_utang').val()));
    var perusahaan_prosentase = parseInt(accounting.unformat($('#perusahaan_prosentase').val()));
    var perusahaan_bersih_usaha = perusahaan_prosentase*(perusahaan_nilai-perusahaan_utang)/100;
    $('#perusahaan_bersih_usaha').val(accounting.formatMoney(perusahaan_bersih_usaha, { symbol: "",  format: "%v" }));
    var nisab = parseInt(accounting.unformat($('#nisab').val()));
    if(perusahaan_bersih_usaha >= nisab){
      perusahaan_harta_zakat = perusahaan_bersih_usaha;
    }else{
      perusahaan_harta_zakat = 0;
    }
    $('#perusahaan_harta_zakat').val(accounting.formatMoney(perusahaan_harta_zakat, { symbol: "",  format: "%v" }));   
    var perusahaan_zakat = 2.5/100*perusahaan_harta_zakat;
    $('#perusahaan_zakat').val(accounting.formatMoney(perusahaan_zakat, { symbol: "",  format: "%v" }));   
}

function calculate_total_zakat(){
   var perusahaan_zakat = parseInt(accounting.unformat($('#perusahaan_zakat').val())); 
   var pribadi_zakat = parseInt(accounting.unformat($('#pribadi_zakat').val())); 
   var total_zakat = pribadi_zakat + perusahaan_zakat;
   $('#total_zakat').val(accounting.formatMoney(total_zakat, { symbol: "",  format: "%v" }));   
}