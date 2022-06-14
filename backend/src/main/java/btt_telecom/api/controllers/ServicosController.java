package btt_telecom.api.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import btt_telecom.api.dto.ServicoidDTO;
import btt_telecom.api.models.Material;
import btt_telecom.api.models.Servico;
import btt_telecom.api.repositories.ClienteRepository;
import btt_telecom.api.repositories.FuncionarioRepository;
import btt_telecom.api.repositories.MaterialRepository;
import btt_telecom.api.repositories.ProvedorRepository;
import btt_telecom.api.repositories.ServicoProvedorRepository;
import btt_telecom.api.repositories.ServicoRepository;

@RestController
@RequestMapping(path = "/api/servico")
public class ServicosController {
	
	@Autowired
	private ServicoRepository servicoRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@Autowired
	private ServicoProvedorRepository servicoProvedorRepository;
	
	@Autowired
	private ProvedorRepository provedorRepository;
	
	@Autowired
	private MaterialRepository materialRepository;
	
	@GetMapping
	public ResponseEntity<List<Servico>> findAll(){
		try {
			return new ResponseEntity<>(servicoRepository.findAll(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(path = "/page")
	public ResponseEntity<Page<Servico>> findAllWithPage(Pageable pageable){
		try {
			return new ResponseEntity<Page<Servico>>(servicoRepository.findAll(pageable), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<ServicoidDTO> findById(@PathVariable(name = "id") Long id){
		try {
			if(servicoRepository.existsById(id)) {
				return new ResponseEntity<>(new ServicoidDTO(servicoRepository.findById(id).get()), HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(path = "/funcionario")
	public ResponseEntity<List<Servico>> findServicosByStatusByFunc(@RequestParam(name = "id", required = false) Long id, @RequestParam(name = "status", required = false) String status){
		try {
			return new ResponseEntity<>(servicoRepository.findServicesInProgressByFunc(id, status), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	//Arrumar esta porra
	@PostMapping(path = "/create")
	public ResponseEntity<HttpStatus> save(@RequestBody String body) throws ParseException, JSONException{
		try {
			JSONObject json = new JSONObject(body);
			Servico s = new Servico();
			Date data;

			s.setCliente(clienteRepository.findById(json.getLong("id_cliente")).get());
			s.setFuncionario(funcionarioRepository.findById(json.getLong("id_func")).get());
			s.setContrato(json.getString("contrato"));
			s.setProtocolo(json.getString("protocolo"));
			s.setStatus(json.getString("status"));
			s.setProvedor(provedorRepository.findById(json.getLong("id_prov")).get());
			s.setServicoProvedor(servicoProvedorRepository.findById(json.getLong("id_serv")).get());
			
			String data_finalizacao = json.getString("data_finalizacao");
			data = new SimpleDateFormat("yyyyy-MM-dd").parse(data_finalizacao);
			s.setData_finalizacao(data);
			
			if(servicoRepository.save(s) != null) {
				return new ResponseEntity<>(HttpStatus.CREATED);
			}else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		}catch(JSONException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping
	public ResponseEntity<HttpStatus> editStatus(@RequestParam(name = "id", required = false) Long id, @RequestParam(name = "status", required = false) String status, @RequestBody String body){
		try {
			if(servicoRepository.existsById(id)) {
				JSONObject json = new JSONObject(body);
				
				Servico s = servicoRepository.findById(id).get();
				s.setStatus(status);
				
				if(json.has("obs") && json.has("cod")) {
					s.setObservacoes(json.getString("obs"));
					s.setCod_quebra(json.getString("cod"));
				}
			
				if(servicoRepository.save(s) != null) {
					return new ResponseEntity<>(HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping(path = "/materiais/{id}")
	public ResponseEntity<HttpStatus> editMateriais(@RequestBody String body, @PathVariable(name = "id") Long id){
		try {
			if(servicoRepository.existsById(id)) {
				JSONArray jsonarray = new JSONArray(body);
				List<Material> list = new ArrayList<>();
				JSONObject obj;
				for(int i = 0; i < jsonarray.length(); i++) {
					obj = new JSONObject(jsonarray.get(i).toString());
					list.add(materialRepository.findById(obj.getLong("id")).get());
				}
				Servico s = servicoRepository.findById(id).get();
				s.setMateriais(list);
				
				if(servicoRepository.save(s) != null) {
					return new ResponseEntity<>(HttpStatus.OK);
				}else {
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping(path = "/{id}")
	private ResponseEntity<HttpStatus> delete(@PathVariable(name = "id") Long id){
		try {
			if(servicoRepository.existsById(id)) {
				servicoRepository.deleteById(id);
				return new ResponseEntity<>(HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception e) {
			return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
		}
	}
}