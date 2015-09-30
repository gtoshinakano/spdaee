<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>DAEE - Portal</title>
	</head>
	<body>
	<h1>Hello</h1>
	<?php
            include "conecta.php";

            $sql = "SELECT * FROM cadastro ORDER BY prontuario ASC";
            $query = mysql_query($sql);
            $i = 0;
            $texto = "{\n";


            while($linha = mysql_fetch_array($query)){

                $texto.= "\t\"$i\":{\n";
                $texto.= "\t\t\"login\": \"".$linha['prontuario']."\", \n";
                $texto.= "\t\t\"senha\": \"".$linha['prontuario']."\", \n";
                $texto.= "\t\t\"prontuario\": \"".$linha['prontuario']."\", \n";
                $texto.= "\t\t\"nome\": \"".$linha['nome']."\", \n";
                $texto.= "\t\t\"local\": {\n";
                $texto.= "\t\t\t\"diretoria\": \"".$linha['diretoria']."\", \n";
                $texto.= "\t\t\t\"divisao\": \"".$linha['divisao']."\", \n";
                $texto.= "\t\t\t\"servico\": \"".$linha['servico']."\", \n";
                $texto.= "\t\t\t\"secao\": \"".$linha['secao']."\", \n";
                $texto.= "\t\t\t\"setor\": \"".$linha['setor']."\" \n";
                $texto.= "\t\t},\n";
                $texto.= "\t\t\"cargo\": \"".$linha['cargo']."\", \n";
                //$texto.= "\t\t\"status\": \"".$linha['status']."\", \n";
                $texto.= "\t\t\"status\": 1 \n";
                $texto.= "\t},\n";

                $i++;

            }

            $texto.= "}\n";

            echo $texto;



	?>
	</body>
</html>
