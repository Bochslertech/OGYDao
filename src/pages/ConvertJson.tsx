import {
  chakra, FormControl, FormLabel,Input, Link, Container, useToast
} from "@chakra-ui/react";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useState,useRef,ReactNode } from "react";
import * as XLSX from 'xlsx';
import JSZip from "jszip";
// @ts-ignore
import { saveAs } from 'file-saver';

function ConvertJson(){
  const {principal} = useWalletConnect()
  const toast = useToast()

  const onImportExcel = (file:any) => {
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        // @ts-ignore
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data :any = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{
              defval:""
            }));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        // console.log(data);
        var zip = new JSZip();

        for (let i = 0;i<data.length;i++) {
          let json = {url:"",thumb:"",name:"",description:"",attributes:[] as any}
          if ("name" in data[i]) {
            json["name"] = data[i]["name"]
          }

          if ("description" in data[i]) {
            json["description"] = data[i]["description"]
          }

          if ("traittype" in data[i] && "value" in data[i]) {
            if (data[i]["traittype"] == "" || data[i]["value"] == ""){
              continue
            }
            json["attributes"].push({value:String(data[i]["value"]),trait_type:String(data[i]["traittype"])})
          }

          for (let j = 1;j<30;j++) {
            if ("traittype"+"_"+j in data[i] && "value"+"_"+j in data[i]) {
              if (data[i]["traittype"+"_"+j] == "" || data[i]["value"+"_"+j] == ""){
                continue
              }
              json["attributes"].push({value:String(data[i]["value"+"_"+j]),trait_type:String(data[i]["traittype"+"_"+j])})
            }
          }
          zip.file(i+".json", JSON.stringify(json));
          console.log(data[i])
        }
        // zip.file("Hello.txt", "Hello World\n");
        zip.generateAsync({type:"blob"})
          .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
          });
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  }
  return (
    <chakra.div mt={5}>
      <Container maxW={"4xl"}>
        <FormControl>
          <FormLabel>Select File</FormLabel>
          <Input type={"file"} accept=".xlsx,.xls" onChange={onImportExcel}  placeholder='Basic usage' />

          <chakra.div>
            <Link href='https://docs.google.com/spreadsheets/d/13BtIURpWeCGtPte9vIJw4fYAErvELucU/edit?usp=sharing&ouid=111464714673902250147&rtpof=true&sd=true' isExternal>
              点击下载模板
            </Link>
          </chakra.div>


        </FormControl>
      </Container>
    </chakra.div>
  )
}

export default ConvertJson;