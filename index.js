document.getElementById('calculate-btn').addEventListener('click', function() {
    calculateTotal();
  });
  
  document.getElementById('add-custom-field-btn').addEventListener('click', function() {
    addCustomField();
  });
  
  document.getElementById('export-excel-btn').addEventListener('click', function() {
    exportToExcel();
  });
  
  function calculateTotal() {
    var aluguer = parseFloat(document.getElementById('aluguer').value) || 0;
    var alimentacao = parseFloat(document.getElementById('alimentacao').value) || 0;
    var luz = parseFloat(document.getElementById('luz').value) || 0;
    var agua = parseFloat(document.getElementById('agua').value) || 0;
    var internet = parseFloat(document.getElementById('internet').value) || 0;
    var limpeza = parseFloat(document.getElementById('limpeza').value) || 0;
    var condominio = parseFloat(document.getElementById('condominio').value) || 0;
    var garagem = parseFloat(document.getElementById('garagem').value) || 0;
    var manutencao = parseFloat(document.getElementById('manutencao').value) || 0;
    
    var customFields = document.querySelectorAll('.custom-field');
    var customFieldsTotal = 0;
    customFields.forEach(function(field) {
      customFieldsTotal += parseFloat(field.value) || 0;
    });
    
    var total = aluguer + alimentacao + luz + agua + internet + limpeza + condominio + garagem + manutencao + customFieldsTotal;
    
    document.getElementById('total').textContent = total.toFixed(2);
  }
  
  function addCustomField() {
    var customFieldsContainer = document.getElementById('custom-fields-container');
    var newCustomField = document.createElement('div');
    newCustomField.innerHTML = `
      <div>
        <label for="custom-field-name">Nome do Campo:</label>
        <input type="text" class="custom-field-name" name="custom-field-name">
        <label for="custom-field-value">Valor do Campo:</label>
        <input type="number" class="custom-field" name="custom-field">
        <button type="button" class="remove-custom-field-btn">Remover</button>
      </div>
    `;
    customFieldsContainer.appendChild(newCustomField);
  }
  
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-custom-field-btn')) {
      event.target.parentElement.remove();
    }
  });
  
  function exportToExcel() {
    var data = [];
    var labels = ['Campo', 'Valor'];
    
    // Adiciona os campos padrão
    data.push(['Aluguer da Casa', document.getElementById('aluguer').value || 0]);
    data.push(['Alimentação', document.getElementById('alimentacao').value || 0]);
    data.push(['Luz', document.getElementById('luz').value || 0]);
    data.push(['Água', document.getElementById('agua').value || 0]);
    data.push(['Internet', document.getElementById('internet').value || 0]);
    data.push(['Materiais de Limpeza', document.getElementById('limpeza').value || 0]);
    data.push(['Condomínio', document.getElementById('condominio').value || 0]);
    data.push(['Garagem', document.getElementById('garagem').value || 0]);
    data.push(['Manutenção da Casa', document.getElementById('manutencao').value || 0]);
    
    // Adiciona os campos personalizados
    var customFields = document.querySelectorAll('.custom-field');
    customFields.forEach(function(field) {
      var name = field.parentElement.querySelector('.custom-field-name').value;
      var value = field.value || 0;
      data.push([name, value]);
    });
  
    // Cria uma planilha
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet([labels].concat(data));
    XLSX.utils.book_append_sheet(wb, ws, 'Gastos Mensais');
  
    // Gera o arquivo Excel
    XLSX.writeFile(wb, 'gastos_mensais.xlsx');
  }