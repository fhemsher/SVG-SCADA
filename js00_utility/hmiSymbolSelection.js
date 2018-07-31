function hmiSymbolSelected()
{
   if(hmiSymbolSelect.selectedIndex!=0)
   {
            var hmiAdd=hmiSymbolSelect.options[hmiSymbolSelect.selectedIndex].value
             eval("openAdd"+hmiAdd+"Draw()")

   }

}