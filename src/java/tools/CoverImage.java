/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Melnikov
 */
public class CoverImage {
    public List<String> getListCovers(){
        List<String> listFileNames = new ArrayList<>();
        File coverDir = new File(new File("")
                .getPath()+File.pathSeparator
                +"web"+File.pathSeparator+"images");
        for(File file : coverDir.listFiles()){
            listFileNames.add(file.getName().toString());
        }
        return listFileNames;
    }
}
